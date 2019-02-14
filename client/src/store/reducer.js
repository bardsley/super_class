import * as actions from './actions'

const initialState = {
    currentLesson: 12, // TODO dont set a random ID
    currentStudent: null
}

const reducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case actions.SET_LESSON:
            newState.lesson = action.lesson
            newState.currentLesson = action.lesson_id
            break;
        default:
        if(/@@redux/.test(action.type) || /@@INIT/.test(action.type)) {} else {
            console.error("No Code for action.type", action.type)
        }
    }
    return newState;
}

export default reducer;