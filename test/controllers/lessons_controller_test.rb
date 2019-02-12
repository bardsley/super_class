require 'test_helper'

class LessonsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @lesson = lessons(:one)
  end

  test "should get index" do
    get lessons_url, as: :json
    assert_response :success
  end

  test "should create lesson" do
    assert_difference('Lesson.count') do
      post lessons_url, params: { lesson: { dance_styles: @lesson.dance_styles, description: @lesson.description, end_at: @lesson.end_at, lat: @lesson.lat, lng: @lesson.lng, location_name: @lesson.location_name, name: @lesson.name, start_at: @lesson.start_at } }, as: :json
    end

    assert_response 201
  end

  test "should show lesson" do
    get lesson_url(@lesson), as: :json
    assert_response :success
  end

  test "should update lesson" do
    patch lesson_url(@lesson), params: { lesson: { dance_styles: @lesson.dance_styles, description: @lesson.description, end_at: @lesson.end_at, lat: @lesson.lat, lng: @lesson.lng, location_name: @lesson.location_name, name: @lesson.name, start_at: @lesson.start_at } }, as: :json
    assert_response 200
  end

  test "should destroy lesson" do
    assert_difference('Lesson.count', -1) do
      delete lesson_url(@lesson), as: :json
    end

    assert_response 204
  end
end
