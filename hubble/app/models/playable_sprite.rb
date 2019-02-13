class PlayableSprite < ApplicationRecord
  has_many :animations
  has_many :highscores
end
