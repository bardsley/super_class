import * as actions from './actions'

const initialState = {
    currentLesson: 10,
    currentStudent: null
}

const reducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case actions.SET_LESSON:
            newState.currentLesson = action.lesson_id
            break;
        default:
        if(/@@redux/.test(action.type)) {} else {
            console.error("No Code for action.type", action.type)
        }
    }
    return newState;
}

export default reducer;