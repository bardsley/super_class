# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


if Rails.env.development? then
    # Clean up
    puts "* Destroying existing data"
    AdminUser.destroy_all
    Student.destroy_all
    Lesson.destroy_all
    Attendance.destroy_all

    #Start from scratch

    puts "* Create an Admin User"
    # Admin Stuff
    AdminUser.create(email: 'adam.bardsley@gmail.com', password: 'password', password_confirmation: 'password')
    
    puts "* Build some lessons"
    # Lessons
    good_lesson = Lesson.create(
        name: "Super Salsa Sunday", 
        dance_styles: "Salsa, Bachata",
        description: "The only thing worth missing a lie in for",
        location_name: "Vacation View Plaza",
        start_at: DateTime.now + 7.days,
        end_at: DateTime.now + 7.days + 2.hours,
    )
    naff_lesson = Lesson.create(
        name: "Sorta Salsa", 
        dance_styles: "Salsa, Bachata, Merengue",
        description: "We teach whatever you want, just ask and we'll do our best",
        location_name: "Changes TBC",
        start_at: DateTime.now + 7.days,
        end_at: DateTime.now + 7.days + 4.hours,
    )
    
    puts "* Get some students"

    # Students
    diligent_student = Student.create(full_name: 'Joe Suggs', email: 'joe.suggs@gmail.com', phone_number: '0800 JSUGGS')
    non_diligent_student = Student.create(full_name: "Adam Bardsley", email: "adam.bardsley@gmail.com", phone_number: "07734774125")

    puts "* And make a lesson history"
    Attendance.create(student_id: diligent_student.id, lesson_id: good_lesson.id)
end
