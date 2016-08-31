WebsocketRails::EventMap.describe do
	subscribe :create_game, to: MoveController, with_method: :new_game
	subscribe :join_game, to: MoveController, with_method: :join_game
	subscribe :set_ships_board, to: MoveController, with_method: :set_ships_board
	subscribe :shot_bullet, to: MoveController, with_method: :shot_bullet
end
