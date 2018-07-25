const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'ALLUSERS':
            return action.data
        default:
            return state
    }
}

export const allUsers = (users) => {
    return ({
        type: 'ALLUSERS',
        data: users
    })
}

export default usersReducer