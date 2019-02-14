class AiSpriteSerializer < ActiveModel::Serializer
  attributes :id
  has_many :animations
end
