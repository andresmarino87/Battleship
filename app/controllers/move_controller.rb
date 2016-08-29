class MoveController < WebsocketRails::BaseController
	include GameHelper

	#Create a new game
	def new_game 
		@game = create_game message[:player]
		WebsocketRails[:updates].trigger(:created_game, @game)
	end 

	#Join a game
	def join_game
		@game = join_game message
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
