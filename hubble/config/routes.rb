Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :playable_sprites, only: [:index, :create, :update]
      resources :highscores, only: [:index, :create, :update]
      resources :animations, only: [:index, :show, :create, :update]
      resources :ai_sprites, only: [:index, :create, :update]
    end
  end

end
