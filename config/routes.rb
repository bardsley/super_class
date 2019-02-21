Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api', defaults: { format: :json } do
    resources :lessons
    resources :students
    resources :attendances do
      collection do
        delete :clear
      end    
    end
    
  end
end
