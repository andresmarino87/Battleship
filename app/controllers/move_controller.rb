class MoveController < WebsocketRails::BaseController
	include GameHelper

	#Create a new game
	def new_game 
		logger.info "new_game Start the request...0"
		@game = create_game message[:player]
		logger.info "new_game Start the request...1"
		WebsocketRails[:updates].trigger(:created_game, @game)
	end 

	#Join a game
	def join_game
		@game = user_join_game message[:game_id], message[:player]
		WebsocketRails[:updates].trigger(:joined_game, @game)
	end

	#shot a bullet
	def shot_bullet
		WebsocketRails[:updates].trigger(:update, "test")
	end

	def take_hit
		WebsocketRails[:updates].trigger(:update, "test")
	end
end
