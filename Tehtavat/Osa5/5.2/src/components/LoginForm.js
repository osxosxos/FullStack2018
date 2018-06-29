import React from 'react'

const LoginForm = (props) => {
    return (
        <div>
            <h2>Log in to application to see all blogs</h2>
            <form onSubmit={props.login}>
                <div>
                    username:
                    <input
                        type="text"
                        name="username"
                        value={props.state.username}
                        onChange={props.handleLoginFieldChange}
                    />
                </div>
                <div>
                    password:
                    <input
                        type="password"
                        name="password"
                        value={props.state.password}
                        onChange={props.handleLoginFieldChange}
                    />
                </div>
                <button type="submit">log in</button>
            </form>
        </div>
    )
}

export default LoginForm