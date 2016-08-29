Rails.application.routes.draw do
    get 'games/:id', to: 'game#index'
    root 'game#index'
end
