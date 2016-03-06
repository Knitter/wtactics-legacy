echo "Starting shared data server..."
nohup ruby -rubygems shared_data.rb > shared_data.log &

echo "Starting login server..."
nohup ruby -rubygems login.rb > login.log &

echo "Starting lobby server..."
nohup ruby -rubygems lobby.rb > lobby.log &

echo "Starting game server..."
nohup ruby -rubygems game.rb  > game.log &

echo "All servers launched."


