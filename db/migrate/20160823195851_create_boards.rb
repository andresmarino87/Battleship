class CreateBoards < ActiveRecord::Migration
	def change
		create_table :boards do |t|
			t.references :game, index: true, foreign_key: true, null: false
			t.text :board
			t.timestamps null: false
		end
	end
end
