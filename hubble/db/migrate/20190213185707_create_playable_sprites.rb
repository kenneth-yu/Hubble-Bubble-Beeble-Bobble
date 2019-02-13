class CreatePlayableSprites < ActiveRecord::Migration[5.2]
  def change
    create_table :playable_sprites do |t|
      t.string :name
      t.string :location
      t.integer :height
      t.integer :width

      t.timestamps
    end
  end
end
