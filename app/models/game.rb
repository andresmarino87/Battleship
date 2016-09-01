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

	def get_player_board_index(player)
		if player1 == player
			return 0
		else
			return 1
		end
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
			update_attribute(:current_user_id, "2")
		else
			update_attribute(:current_user_id, "1")
		end
	end
end
