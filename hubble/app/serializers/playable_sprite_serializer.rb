class PlayableSpriteSerializer < ActiveModel::Serializer
  attributes :id
  has_many :highscores
end
