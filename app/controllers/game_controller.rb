class GameController < ApplicationController
	skip_before_action :verify_authenticity_token
	@player

    respond_to :json
	def index
		@player = params[:id]
	end

	def new_game
		d = Date.parse(Time.now.to_s)
		@game = Game.create(player1: params[:id], player2: "0", current_user_id: params[:id], room: "Room"+(d >> 1).strftime("%Y-%m-%d-%H:%M"))
       	render json: @game, status: 200
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
		params.require(:game).permit(:room)
	end
end
