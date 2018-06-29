import React from 'react'

const Person = (props) => {
    if (props.search === '') {
        return (
            <p>{props.name} {props.number}</p>
        )
    } else if (props.name.toLowerCase().includes(props.search.toLowerCase())) {
        return (
            <p>{props.name} {props.number}</p>
        )
    } else {
        return (
            null
        )
    }
}

export default Person