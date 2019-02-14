export const SET_LESSON = 'SET_LESSON'
export const SET_STUDENT = 'SET_STUDENT'

export const setLesson = (lesson) => {
    return {
        type: SET_LESSON,
        lesson: lesson,
        lesson_id: lesson.id
    }
}
