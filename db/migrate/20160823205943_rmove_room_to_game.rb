class RmoveRoomToGame < ActiveRecord::Migration
	def change
  		remove_column :games, :room
	end
end
