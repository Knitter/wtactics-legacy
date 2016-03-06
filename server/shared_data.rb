require 'drb'

# This server is there to maintain the shared data.
# It covers the users currently logged-in as well
# as the ongoing games


# Users
DRb.start_service 'druby://localhost:9001', {}

#Games
DRb.start_service 'druby://localhost:9002', {}

puts 'Shared data server launched...'
DRb.thread.join
