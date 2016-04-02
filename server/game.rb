require './server'

$card_list = []
for line in open('card_list')
	$card_list += [line.strip]
end
$locations = ['deck', 'hand', 'resources', 'graveyard', 'west', 'east']

$all_games = {}
$all_games_reg = DRbObject.new nil, 'druby://localhost:9002'



class Game
	attr_accessor :game_id
	attr_accessor :sideA
	attr_accessor :sideB
	attr_accessor :observers
	attr_accessor :all_cards
	
	def initialize
		@observers = []
		@all_cards = {}
	end
	
	def playerA
		if @sideA == nil
			return nil
		else
			return @sideA.player
		end
	end
	
	def playerB
		if @sideB == nil
			return nil
		else
			return @sideB.player
		end
	end
	
	
	def join(player)
		if playerA == nil
			@sideA = Side.new('sideA', self, player)
			return @sideA
		elsif playerB == nil
			@sideB = Side.new('sideB', self, player)
			return @sideB
		else
			throw "game full!"		
		end
	end
end



class Side
	attr_accessor :name
	attr_accessor :player
	attr_accessor :deck
	attr_accessor :hand
	attr_accessor :resources
	attr_accessor :graveyard
	attr_accessor :west
	attr_accessor :east
	
	attr_accessor :locations
	
	
	def initialize(name, game, player)
		@name = name
		@game = game
		@player = player
		
		@deck = []
		@hand = []
		@resources = []
		@graveyard = []
		@west = []
		@east = []
		
		@locations = {}
		@locations['deck'] = @deck
		@locations['hand'] = @hand
		@locations['resources'] = @resources
		@locations['graveyard'] = @graveyard
		@locations['west'] = @west
		@locations['east'] = @east
		
		makeRandomDeck()
	end
	
	# Creates a deck containing all cards twice
	def makeRandomDeck()
		@deck = []
		for card_name in $card_list
			card = makeCard(card_name)
			@game.all_cards[card.card_id] = card
			@deck += [card]
		end
		@deck.shuffle!
	end
		
	def makeCard(card_name)
		card = Card.new
		card.card_id = "card_#{@game.all_cards.size + 1}"
		card.name = card_name
		card.owner = @player
		card.side = self
		card.location = 'deck'
		card.visibility = 'downside'
		card.flipped = false
		return card
	end
end


class Card
	attr_accessor :card_id # the card id: each card on the table is uniquely identified
	attr_accessor :name    # the card name
	attr_accessor :owner   # Player

	attr_accessor :side
	attr_accessor :location # deck, hand, west... 
	attr_accessor :visibility # upside / downside / hidden (visible to owner only)
	attr_accessor :flipped  # is it rotated 90' or not?
	
	def flip()
		@flipped = ! @flipped
	end
	

	def moveTo(side, location)
		if side != nil and location != nil
			@side.locations[@location] -= [self]
		end
		@side = side
		@location = location
		@side.locations[@location] += [self]
		
		@flipped = false
		if location == 'deck' or location == 'resources'
			@visibility = 'downside'
		elsif location == 'hand'
			@visibility = 'hidden'
		else # graveyard, west, east
			@visibility = 'upside'
		end
	end
end



class GameDispatcher
	
	def initialize(server, player)
		@server = server
		@player = player
	end
	
	def join(game_id)
		@game = register(game_id)
		
		if @game.playerA == nil or @game.playerB == nil
			
			$all_games_reg[game_id] += [@player.username]
			side = @game.join(@player)
			@player.send "join ok #{side.name}"
			
			@player.websocket.onclose   { quit(side) }
			
			if @game.playerA != nil and @game.playerB != nil
				gameHandler = GameHandler.new(@game, @game.playerA)
				@server.setHandler(@game.playerA, gameHandler)
				
				gameHandler = GameHandler.new(@game, @game.playerB)
				@server.setHandler(@game.playerB, gameHandler)
				
				@game.playerA.send 'game_started'
				@game.playerB.send 'game_started'
			end
		else
			@player.send 'join error - game already has two players.'
		end
		
	end
	
	def quit(side)
		@server.logout(@player)
		side.player = nil
		if @game.playerA != nil 
			@game.playerB.send "game_ended - opponent has left"
		elsif @game.playerB != nil
			@game.playerB.send "game_ended - opponent has left"
		else
			unregister(@game.game_id)
		end
	end
	
	
	def register(game_id)
		puts "Game created: #{game_id}"
		game = $all_games[game_id]
		if game == nil
			game = Game.new
			game.game_id = game_id
			$all_games[game_id] = game
			$all_games_reg[game_id] = []
		end
		return game
	end
	
	def unregister(game_id)
		puts "Game removed: #{game_id}"
		$all_games.delete game_id
		$all_games_reg.delete game_id
	end
end



class GameHandler
	
	def initialize(game, player)
		@game = game
		@player = player
		
		if game.playerA == player
			@side = game.sideA	
			@other_side = game.sideB
		elsif game.playerB == player
			@side = game.sideB
			@other_side = game.sideA
		else
			throw "Error: player isn't registered on either side!"
		end
	end
	
	
	def reply(msg)
		@player.send msg
	end
	
	
	def sendToAll(msg)
		@game.playerA.send msg
		@game.playerB.send msg
		for obs in @game.observers
			obs.send msg
		end
	end
	
	def sendToOpponent(msg)
		@other_side.player.send msg
	end
	
	
	def draw_card(args)
		if @side.deck.empty?
			reply 'draw_card error - deck is empty'
			return
		end
		
		card = @side.deck.pop
		reply "draw_card ok #{card.card_id} #{card.name}"
		
		card.moveTo(@side, 'hand')
		notifyCardMove(card)
	end

	def notifyCardMove(card)
	
		if card.visibility == 'downside' or (card.visibility == 'hidden' and card.owner != @player)
			card_name = "downside"
		else
			card_name = card.name
		end
		reply "move #{card.card_id} #{card_name} to #{card.side.name} #{card.location} #{card.flipped}"
		
		if card.visibility == 'downside' or (card.visibility == 'hidden' and card.owner != @other_side.player)
			card_name = "downside"
		else
			card_name = card.name
		end
		sendToOpponent "move #{card.card_id} #{card_name} to #{card.side.name} #{card.location} #{card.flipped}"
	end


	def move(args)
		(card_id, to, sidename, location) = args.split(' ')

		# Is the request all right?
		if (to != 'to' or location == nil)
			reply 'move error - malformated request'
			return
		end
		
		card = @game.all_cards[card_id]

		if (card == nil)
			reply 'move error - invalid card_id'
			return
		end
		
		if sidename == 'sideA'
			side = @game.sideA
		elsif sidename == 'sideB'
			side = @game.sideB
		else
			reply "move error - malformated request - #{sidename} is not a valid side"
			return
		end
		
		if (not $locations.include?  location)		
			reply "move error - malformated request - #{location} is not a valid location"
			return
		end

		begin
			card.moveTo(side, location)
			notifyCardMove(card)
		rescue Exception => e
			reply "move error - #{e}"
		end
	end
	
	
	def flip(card_id)
		
		card = @game.all_cards[card_id]

		if (card == nil)
			reply 'flip error - invalid card_id'
			return
		end
		
		card.flip
		
		sendToAll "flip #{card.card_id} #{card.flipped}"
	end
end
	
server = Server.new("0.0.0.0", 8003, GameDispatcher) 
server.start


