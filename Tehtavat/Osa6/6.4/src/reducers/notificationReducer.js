
const initialState = 'This is a notification...'

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'DELETE':
            console.log('case:DELETE')
            setTimeout(() => {
                console.log(action.notification)
                console.log('deleting...')
                return action.notification
            }, 5000)
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