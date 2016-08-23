class GameController < ApplicationController
    respond_to :json
	def index
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
		test = Hash[board.map.with_index { |value, index| [index, value] }]
#		jboard= Hash[@board.map { |l| [l.column, [l.test, l.test2, l.test3]] }]
        render json: test, status: 200
   	end
end
