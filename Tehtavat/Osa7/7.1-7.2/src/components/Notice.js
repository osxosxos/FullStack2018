import React from 'react'

const Notice = (props) => {
    if (props.message === null) {
        return null
    }

    if (props.message === 'wrong username or password') {
        return (
            <div className="error">
                {props.message}
            </div>
        )
    }

    if (props.message === 'Blog successfully added!') {
        return (
            <div className="notice">
                {props.message}
            </div>
        )
    }
}

export default Notice