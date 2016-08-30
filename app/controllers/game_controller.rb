class GameController < ApplicationController
	skip_before_action :verify_authenticity_token
	@player

	respond_to :json
	def index
		@player = params[:id]
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
