class Game < ActiveRecord::Base
	has_one :board

	validates :state, inclusion: { in: ['waiting', 'setup', 'playing', 'over'] }

end
