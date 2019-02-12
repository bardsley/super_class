class CreateLessons < ActiveRecord::Migration[5.2]
  def change
    create_table :lessons do |t|
      t.string :name
      t.text :description
      t.string :dance_styles
      t.datetime :start_at
      t.datetime :end_at
      t.string :location_name
      t.decimal :lat
      t.decimal :lng

      t.timestamps
    end
  end
end
