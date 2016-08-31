module GameHelper
	#Create a new game
	def create_game(player_id)
		board = Array.new(2) { Array.new(10) { Array.new(10, 0) } }
		d = Date.parse(Time.now.to_s)
		@game = Game.new(player1: player_id, player2: "0", current_user_id: player_id, room: "Room"+(d >> 1).strftime("%Y-%m-%d-%H:%M"))
		if @game.save 
			@board = Board.create(game_id: @game.id,board: board)
			return (@game.as_json).merge(@board.as_json)
		else
			return @game.errors
		end
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

		#Join a Game
	def user_take_shot(data)
		@game = Game.find(data[:game_id])
		@board = @game.board
		index = @game.get_player_board_index data[:player]
		@board.board[index][data[:x].to_i][data[:y].to_i] = 1
		@board.save
		@game.current_user_id =@game.toggle_current_player
		@game.save
		return ( @game.as_json ).merge(message.as_json)
	end
end
