class RemoveSpriteIdFromHighscores < ActiveRecord::Migration[5.2]
  def change
    remove_column :highscores, :playable_sprite_id
  end
end
