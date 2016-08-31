class MoveController < WebsocketRails::BaseController
	include GameHelper

	#Create a new game
	def new_game 
		@game = create_game message[:player]
		WebsocketRails[:updates].trigger(:created_game, @game)
	end 

	#Join a game
	def join_game
		@game = user_join_game message[:game_id], message[:player]
		WebsocketRails[:updates].trigger(:joined_game, @game)
	end

	#shot a bullet
	def shoot_bullet
		@res = user_take_shot message
		WebsocketRails[:updates].trigger(:take_the_shot, @res)
	end
end
