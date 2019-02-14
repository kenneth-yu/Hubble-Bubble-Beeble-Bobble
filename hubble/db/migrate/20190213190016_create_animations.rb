class CreateAnimations < ActiveRecord::Migration[5.2]
  def change
    create_table :animations do |t|
      t.string :name
      t.integer :start
      t.integer :end
      t.integer :playable_sprite_id
      t.integer :ai_sprite_id

      t.timestamps
    end
  end
end
