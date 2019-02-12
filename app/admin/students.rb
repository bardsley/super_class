ActiveAdmin.register Student do
    permit_params :first_name, :last_name, :email, :phone_number
    preserve_default_filters!
    filter :lessons

    index do
        selectable_column
        column "Full name", sortable: :full_name do |student|
            link_to student.full_name, admin_student_path(student)
        end
        column :email
        column :phone_number
        actions
    end
end
