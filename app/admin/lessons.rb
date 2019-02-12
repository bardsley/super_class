ActiveAdmin.register Lesson do
    permit_params :name, :description, :dance_styles,
        :start_at, :end_at,
        :location_name, :lat, :lng
    preserve_default_filters!
    filter :students
    remove_filter :lat, :lng

    index do
        selectable_column
        column "Name", sortable: :name do |lesson|
            link_to lesson.name, admin_lesson_path(lesson)
        end
        column :dance_styles
        column :start_at
        column :end_at
        column :location_name
        column :created_at
        actions
    end
end
