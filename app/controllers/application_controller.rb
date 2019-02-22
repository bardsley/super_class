include ActionController::MimeResponds

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token, if: -> { controller_name == 'sessions' && (action_name == 'new' || action_name == 'create') }
  respond_to :html, :json
end