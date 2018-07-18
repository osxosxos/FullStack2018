const initialState = 'This is a notification...'

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            return action.notification
        default:
            return state
    }
}

export const notify = (anecdote, time) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET',
            notification: anecdote + ' has been voted'
        })
        setTimeout(() => {
            dispatch({
                type: 'SET',
                notification: null
            })
        }, time)
    }
}

export default notificationReducer