Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :playable_sprites, only: [:index, :create, :update]
      resources :highscores, only: [:index, :create, :update]
<<<<<<< HEAD
      resources :animations, only: [:index, :show, :create, :update]
=======
      resources :animations, only: [:index, :create, :update]
>>>>>>> 14d6cb79119096c4bf4905ffde8ed40ab571d9b8
      resources :ai_sprites, only: [:index, :create, :update]
    end
  end

end
