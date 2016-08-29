WebsocketRails::EventMap.describe do
	namespace :move do
		subscribe :create_game, to: MoveController, with_method: :new_game
		subscribe :join_game, to: MoveController, with_method: :join_game
		subscribe :shot_bullet, to: MoveController, with_method: :shot_bullet
	end
end
