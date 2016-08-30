Rails.application.routes.draw do
    root 'game#index'
    get 'games/:id', to: 'game#index'
end
