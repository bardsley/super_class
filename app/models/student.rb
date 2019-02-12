class Student < ApplicationRecord
  attribute :full_name
  has_many :attendances
  has_many :lessons, through: "attendances"

  def self.filter_by(query)
    students = Student.order([:first_name, :last_name])
    tokens = query.split(" ")
    tokens.each do |token|
      q = "%" + token + "%"
      students = students.where("first_name ILIKE :q OR last_name ILIKE :q OR email ILIKE :q",{q: q})
    end
    students
  end

  def full_name=(full_name)
    names = full_name.split(" ")
    self.first_name = names.first
    self.last_name = names.last
    self.last_name = "(Like Cher?)" if self.last_name == self.first_name
  end

  def full_name
    [first_name, last_name].join(' ')
  end
end


