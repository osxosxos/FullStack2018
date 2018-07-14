const initialState = 'This is a notification...'

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'DELETE':
            return action.notification
        default:
            return state
    }
}

export const notificationChange = (anecdote) => {
    return {
        type: 'SET_NOTIFICATION',
        notification: anecdote + ' has been voted'
    }
}

export const notificationDeletion = () => {
    return {
        type: 'DELETE',
        notification: null
    }
}

export default notificationReducer