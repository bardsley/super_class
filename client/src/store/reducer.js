import * as actions from './actions'

const initialState = {
    // lesson: {
    //     id: 12,
    //     attendances: []
    // }
}

const reducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case actions.SET_LESSON:
            newState.lesson = action.lesson
            break;
        case actions.LOAD_STUDENTS:
            newState.students = action.students
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
            console.log("CREATED A STUDNET")
            break;
        default:
        if(/@@redux/.test(action.type) || /@@INIT/.test(action.type)) {} else {
            console.error("No Code for action.type", action.type)
        }
    }
    return newState;
}

export default reducer;