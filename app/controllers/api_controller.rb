class ApiController < ActionController::API
    before_action :authenticate_admin_user!
    respond_to :json
end
