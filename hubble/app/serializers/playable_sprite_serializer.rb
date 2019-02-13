class PlayableSpriteSerializer < ActiveModel::Serializer
  attributes :id
  has_many :highscores
  has_many :animations
end
