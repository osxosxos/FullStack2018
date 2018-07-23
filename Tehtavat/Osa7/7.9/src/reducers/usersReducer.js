const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'ALL':
            return action.data
        default:
            return state
    }
}

export const allUsers = (users) => {
    return {
        type: 'ALL',
        data: users
    }
}

export default usersReducer