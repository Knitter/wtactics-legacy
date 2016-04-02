# the app is based on several mini-servers, dealing with the various areas (login, lobby and games)
# this script launches these mini-servers as well as the file server
#
# please make sure that other ruby processes are not running (an old server might be running and occupying the port)
#
# the logs can be found in server/*.log
# I think there is a problem with port-forwarding
# see https://docs.c9.io/docs/multiple-ports

cd server

echo "Starting shared data server..."
nohup ruby -rubygems shared_data.rb > shared_data.log &

echo "Starting login server..."
nohup ruby -rubygems login.rb > login.log &

echo "Starting lobby server..."
nohup ruby -rubygems lobby.rb > lobby.log &

echo "Starting game server..."
nohup ruby -rubygems game.rb  > game.log &

cd ..

echo "Starting file server..."
ruby -run -e httpd client -p 8080

echo "All servers launched."


