const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET':
            return action.notification
        default:
            return state
    }
}

export const notify = (message) => {
    return ({
        type: 'SET',
        notification: message
    })
}

export const clear = () => {
    return ({
        type: 'SET',
        notification: null
    })
}

export default notificationReducer