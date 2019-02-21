class AddJwtBlacklist < ActiveRecord::Migration[5.2]
  def change
    add_column :admin_users, :jti, :string
    AdminUser.all.each { |user| user.update_column(:jti, SecureRandom.uuid) }
    change_column_null :admin_users, :jti, false
    add_index :admin_users, :jti, unique: true
  end
end
