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
	def shot_bullet


player: $('#my_id').attr('value'),
					game_id: $("#my_board").attr("value"),
					x: shot[0],
					y: shot[1]};
		
		WebsocketRails[:updates].trigger(:update, @game)
	end

	def take_hit
		WebsocketRails[:updates].trigger(:update, "test")
	end
end
