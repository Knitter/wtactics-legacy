require './server'

server = Server.new("0.0.0.0", 8081, nil)
server.start

