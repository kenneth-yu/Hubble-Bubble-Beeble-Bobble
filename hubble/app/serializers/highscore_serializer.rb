class HighscoreSerializer < ActiveModel::Serializer
  attributes :id, :score, :username
end
