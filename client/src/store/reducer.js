import { combineReducers } from 'redux'
import * as actions from './actions'

const initialLessonState = {
    // lesson: {
    //     id: 12,
    //     attendances: []
    // }
}

const content = (state = initialLessonState, action) => {
    const newState = {...state}
    switch (action.type) {
        case actions.SET_LESSON:
            newState.lesson = action.lesson
            let attending_students = action.lesson.attendances.map((attendance) => { return attendance.student_id})
            newState.students = state.students.map((student) => {
                student.attending = attending_students.includes(student.id)
                return student
            })
            break;
        case actions.LOAD_STUDENTS:
            newState.students = action.students
            newState.query = action.query
            break;
        case actions.LOAD_LESSONS:
          newState.lessons = action.lessons
          break;
        case actions.TOGGLE_STUDENT:
            newState.students = state.students.map((student) => {
                if(student.id === action.student.id) {
                    student.attending = action.student.attending
                }
                return student
            })
            break;
        case actions.CREATE_STUDENT:
            // Not needed whilstr doing a full refresh newState.students = state.students.concat(action.student)
            break;
        default:
        // if(/@@redux/.test(action.type) || /@@INIT/.test(action.type)) {} else {
        //     console.error("No Code for action.type", action.type)
        // }
    }
    return newState;
}

const authInitialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }

export const auth = (state = authInitialState, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case actions.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
      })
    case actions.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case actions.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

const reducer = combineReducers({
    auth,
    content
  })
  

export default reducer;