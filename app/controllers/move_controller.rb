class MoveController < WebsocketRails::BaseController
	def shot_bullet
		Viewer.increment_counter(:count,1)
		@count = Viewer.first.count
		WebsocketRails[:updates].trigger(:update, @count)
	end
end
