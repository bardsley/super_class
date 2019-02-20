class AddPricesToLesson < ActiveRecord::Migration[5.2]
  def change
    add_column :lessons, :prices, :jsonb 
  end
end
