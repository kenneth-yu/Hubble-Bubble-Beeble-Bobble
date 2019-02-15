class Highscore < ApplicationRecord
  belongs_to :playable_sprite, optional: true
end
