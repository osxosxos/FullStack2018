import React from 'react'

const LogoutForm = (props) => {
    return (
        <div>
            <form onSubmit={props.logout}>
                {props.state.user.username} {'is logged in '}
                <button type="submit">logout</button>     
            </form>
        </div>
    )
}

export default LogoutForm