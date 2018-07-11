const initialState = 'This is a notification...'

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const notificationChange = () => {
    return {
        type: 'SET_NOTIFICATION' 
    }
}

export default notificationReducer