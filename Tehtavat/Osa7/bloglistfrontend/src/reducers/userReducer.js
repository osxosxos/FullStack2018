const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return action.data
        default:
            return state
    }
}

export const login = (user) => {
    return ({
        type: 'LOGIN',
        data: user 
    })
}

export const logout = () => {
    return ({
        type: 'LOGOUT',
        data: null
    })
}


export default userReducer