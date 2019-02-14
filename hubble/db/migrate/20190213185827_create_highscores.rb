class CreateHighscores < ActiveRecord::Migration[5.2]
  def change
    create_table :highscores do |t|
      t.string :username
      t.integer :score
      t.integer :playable_sprite_id

      t.timestamps
    end
  end
end
