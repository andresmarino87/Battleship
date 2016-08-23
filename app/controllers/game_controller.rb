class GameController < ApplicationController
	skip_before_action :verify_authenticity_token

    respond_to :json
	def index

	end

	def new_game
		@game = Game.new(game_params)
        render json: @game, status: 200
	end

	def join_game

	end

	def show_board
        board = [[1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1],
        		[1,1,1,1,1,1,1,1,1,1],
        		[1,1,1,1,1,1,1,1,1,1],
       			[1,1,1,1,1,1,1,1,1,1],
       			[1,1,1,1,1,1,1,1,1,1],
       			[1,1,1,1,1,1,1,1,1,1],
       			[1,1,1,1,1,1,1,1,1,1],
       			[1,1,1,1,1,1,1,1,1,1],
       			[1,1,1,1,1,1,1,1,1,1]]
		boardHash = Hash[board.map.with_index { |value, index| [index, value] }]
        render json: boardHash, status: 200
   	end

	private
	def game_params
		params.require(:game).permit(:room,:player1)
	end
end
