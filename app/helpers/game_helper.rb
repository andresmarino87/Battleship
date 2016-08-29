module GameHelper
	#Create a new game
	def create_game(player_id)
		board = Array.new(2) { Array.new(10) { Array.new(10, 0) } }
		d = Date.parse(Time.now.to_s)
		@game = Game.create(player1: player_id, player2: "0", current_user_id: player_id, room: "Room"+(d >> 1).strftime("%Y-%m-%d-%H:%M"))
		@board = Board.create(game_id: @game.id,board: board)
		return (@game.as_json).merge(@board.as_json)
	end

	#Join a Game
	def user_join_game(game_id, player)
		@game = Game.find(game_id)
		if @game.open?
			if !@game.same_player? player
				@game.player2 = player
				@game.state = 'setup'
				if(@game.save)
					return (@game.as_json).merge(@game.board.as_json)
				else
					return  @game.errors.full_messages.as_json
				end
			else
		#		return (@game.as_json).merge(@game.board.as_json)
			end
		else
		#	return (@game.as_json).merge(@game.board.as_json)
		end
	end
end
