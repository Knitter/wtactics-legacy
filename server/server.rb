require 'em-websocket'
require 'drb'




class Player
	attr_accessor :game
	
	def initialize(websocket, username)
		@websocket = websocket
		@username = username
	end
	
	def send(msg)
		puts "To #{@username}: #{msg}"
		@websocket.send msg
	end
	
	def username
		return @username
	end
	
	def websocket
		return @websocket
	end

end





class Server

	def initialize(host, port, handler)
		@host = host
		@port = port
		@handler = handler
		@players = {}
		@all_users = DRbObject.new nil, 'druby://localhost:9001'
	end
	
	def players()
		return @players
	end
	
	
	def start()
		puts 'Starting server...'
		EventMachine::WebSocket.start(:host => @host, :port => @port, :debug => false) do |websocket| 
			
			websocket.onopen    { puts "WebSocket connected" }
			websocket.onclose   { puts "WebSocket closed" }
			websocket.onerror   { |e| puts "Error: #{e.message}\n#{e.backtrace.join('   ')}" }
			
			websocket.onmessage do |msg| 
				puts "Message received: #{msg}"
				(cmd, username, password) = msg.split(' ', 3)
				if (cmd == 'login')
					login(websocket, username, password)
				else
					websocket.send "error - incorrect login: #{msg}" 
				end
			end
			
		end
	end
	
	
	def login(websocket, username, password)
		if not (username =~ /\w+/)
			websocket.send "login error - malformated login: it should only contain letters, numbers and underscores"
		elsif  (@all_users.has_key? username) # (@players.has_key? username)
			websocket.send "login error - name already taken"
		else
			# If login is correct
			
			player = Player.new(websocket, username)
			puts "Player logged in: #{player.username}"
			player.send "login ok #{username}"
			
			@all_users[username] = true
			@players[username] = player
			sendToAll "login #{username}"
			
			websocket.onclose   { logout(player) }
			
			if @handler == nil
				websocket.onmessage do |msg| 
					puts "From #{player.username}: #{msg}"
					player.send "server error - no handler set" 
				end
			else
				handler = @handler.new(self, player)
				setHandler(player, handler)
			end
			
			
		end
	end
	
	def setHandler(player, handler)
		player.websocket.onmessage do |msg| 
			puts "From #{player.username}: #{msg}"
			(cmd, arg) = msg.split(' ', 2)
			begin
				handler.send(cmd, arg)
			rescue Exception => e
				puts e.to_s + "\n" + e.backtrace.join("\n")
				player.send "error - server side\n" + e.to_s + "\n" + e.backtrace.join("\n")
			end
		end
	end
	
	def logout(player)
		puts "Player logged out: #{player.username}"
		@players.delete player.username
		@all_users.delete player.username
		sendToAll "logout #{player.username}"
	end
	
	def sendTo(username, msg)
		puts "To #{username}: #{msg}"
		@players[username].websocket.send msg
	end
	
	def sendToAll(msg)
		puts "To *: #{msg}"
		for player in @players.values
			player.websocket.send msg
		end
	end
	
end

