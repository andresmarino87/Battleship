class Game < ActiveRecord::Base
	has_one :board

	validates :state, inclusion: { in: ['waiting', 'setup', 'playing', 'over'] }

	def is_full?
		player2 != "0"
	end

	def open?
		!is_full?
	end

	def same_player?(player)
		player1 == player
	end

#  def players
#    [first_player, second_player]
#  end

#  def player_ids
#    [first_player_id, second_player_id]
#  end

	def update_status(status)
		update_attribute(:state, "#{Game::STATUSES[status.to_i]}" )
	end

	def toggle_current_player
		if current_user_id == "1"
			current_user_id = "2"
		else
			current_user_id = "1"
		end
	end
end
