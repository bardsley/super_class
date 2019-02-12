class CreateAttendances < ActiveRecord::Migration[5.2]
  def change
    create_table :attendances do |t|
      t.integer :student_id
      t.integer :lesson_id
      t.timestamps
    end
  end
end
