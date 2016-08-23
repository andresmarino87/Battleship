class AddRoomToGames < ActiveRecord::Migration
	def change
		add_column :games, :room, :string
		change_column_null :games, :room, false
	end
end
