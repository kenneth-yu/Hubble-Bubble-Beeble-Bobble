class CreateAiSprites < ActiveRecord::Migration[5.2]
  def change
    create_table :ai_sprites do |t|
      t.string :name
      t.string :location
      t.integer :height
      t.integer :width

      t.timestamps
    end
  end
end
