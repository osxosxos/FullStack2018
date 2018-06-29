import React from 'react'

const Person = (props) => {
    const boolean = props.name.toLowerCase().includes(props.search.toLowerCase())
    if (props.search === '' || boolean ) {
        return (
            <p>{props.name} {props.number}<button onClick={props.delete}>poista</button></p>
        )
    } else {
        return (
            null
        )
    }
}

export default Person