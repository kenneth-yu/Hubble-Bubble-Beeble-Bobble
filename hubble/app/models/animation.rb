class Animation < ApplicationRecord
  belongs_to :ai_sprite, optional: true
  belongs_to :playable_sprite, optional: true
end
