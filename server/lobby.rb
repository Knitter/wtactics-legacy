require './server'

$all_games = DRbObject.new nil, 'druby://localhost:9002'

class LobbyHandler

	def initialize(server, player)
		@server = server
		@player = player
	end

	def reply(msg)
		@player.send msg
	end
	
	
	def chat(msg)
		@server.sendToAll('chat ' + @player.username + ': ' + msg)
	end
	
	def create_game(game_id)
		if $all_games.has_key? game_id
			reply "create_game error - player already in game '#{@player.game}'"
		else
			reply "create_game ok #{game_id}"
		end
	end
	
	def cancel_game(game_id)
		if (@player.game == game_id)
			$all_games.delete game_id
			@player.game = nil
			reply "cancel_game ok #{game_id}"
		elsif (@player.game != nil)
			reply "cancel_game error - player in a different game: '$#{@player.game}'"
		else
			reply "cancel_game error - player not in a game"
		end
	end
	
	
	def join_game(game_id)
		if ($all_games.has_key? game_id)
			(playerA, playerB) = $all_games[game_id]
			if (playerB != nil)
				reply 'join_game error - game full'
			else
				reply "join_game ok #{game_id}"
			end
		else
			reply 'join_game error - no such game found'
		end
	end
	
	
	
	def get_player_list(args)
		@player.send('player_list ' + @server.players.keys.join(' '))
	end
	
	def get_game_list(args)
		# Beware: it's not synchronized!
		# TODO !
		res = 'game_list '
		for game_id in $all_games.keys
			if $all_games[game_id][1] == nil
				res += "#{game_id} free "
			else
				res += "#{game_id} full "
			end
		end
		@player.send(res.strip)
	end
end


server = Server.new("0.0.0.0", 8082, LobbyHandler) 
server.start



