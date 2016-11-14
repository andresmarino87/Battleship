module GameHelper
	#Create a new game
	def create_game(player_id, ships)
		board = Array.new(2) { Array.new(10) { Array.new(10, 0) } }
		set_ships_on_board(board,ships,0)
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
	def user_join_game(game_id, player, ships)
		@game = Game.find(game_id)
		if @game.open?
			if !@game.same_player? player
				@game.player2 = player
				@game.state = 'setup'
				@board = @game.board 
				set_ships_on_board(@board.board, ships, 1)
				@board.save
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

	#Take a shot
	def user_take_shot(data)
		@game = Game.find(data[:game_id])
		@board = @game.board
		index = @game.get_other_player_board_index data[:player]
		if  @board.board[index][data[:x].to_i][data[:y].to_i] == 3
			@board.board[index][data[:x].to_i][data[:y].to_i] = 2
			message[:hit] = 2
		else
			@board.board[index][data[:x].to_i][data[:y].to_i] = 1
			message[:hit] = 1
			@game.toggle_current_player
		end
		if(check_if_game_is_over(@board.board[index]))
			message[:game_over] = false
			@game[:state] = "playing"
		else
			message[:game_over] = true
			@game[:state] = "finished"
		end

		@board.save
		return ( @game.as_json ).merge(message.as_json)
	end

	private
	def set_ships_on_board(board, ships, board_index)
		ships.each do |ship|
			board[board_index][ship[:x].to_i][ship[:y].to_i] = 3
		end
	end

	def check_if_game_is_over(board)
		result = false
		board.each do |row|
			row.each do |item|
				result = result || (item == 3)
			end
		end 
		return result;
	end
end
