class GameController < ApplicationController
	skip_before_action :verify_authenticity_token
	@player

	respond_to :json
	def index
		if params[:id]
			@player = params[:id]
		else
			@player = "Please select an user in the URL path --> /games/1 or /games/2"
		end
	end

	private
	def game_params
		params.require(:game).permit(:room)
	end
end
