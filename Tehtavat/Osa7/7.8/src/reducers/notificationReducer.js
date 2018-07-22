const notificationReducer = (state = null, action) => {
    console.log('NOTIFICATIONREDUCER.ACTION.TYPE:')
    console.log(action.type)
    switch (action.type) {
        case 'SET':
            return action.notification
        default:
            return state
    }
}

export const notify = (message) => {
    console.log('NOTIFY.MESSAGE')
    console.log(message)
    return async (dispatch) => {
        dispatch({
            type: 'SET',
            notification: message
        })
        setTimeout(() => {
            dispatch({
                type: 'SET',
                notification: null
            })
        }, 5000)
    }
}

export default notificationReducer