class CreateGames < ActiveRecord::Migration
	def change
		create_table :games do |t|
			t.string   :player1, null: true
			t.string   :player2, null: true
			t.string   :state, null: false, default: "waiting"
			t.string  :current_user_id, null:false
			t.timestamps null: false
		end
	end
end
