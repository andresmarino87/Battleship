class GameController < ApplicationController
	skip_before_action :verify_authenticity_token
	@player

    respond_to :json
	def index
		@player = params[:id]
	end

	def new_game
        board = Array.new(2) { Array.new(10) { Array.new(10, 0) } }
		d = Date.parse(Time.now.to_s)
		@game = Game.create(player1: params[:id], player2: "0", current_user_id: params[:id], room: "Room"+(d >> 1).strftime("%Y-%m-%d-%H:%M"))
 		@board = Board.create(game_id: @game.id,board: board)
       	render json: (@game.as_json).merge(@board.as_json), status: 200
	end

	def join_game
		@game = Game.where(state:'waiting').order(created_at: :desc).first
		@game.player2 = params[:id]
		@game.state = 'setup'
		if(@game.save)
	       	render json: @game, status: 200
	    else
		    @game.errors.full_messages
		end
	end

	def show_board
		@game = Game.find(params[:id])
		render json: @game.board, status: 200
   	end

	private
	def game_params
		params.require(:game).permit(:room)
	end
end
