import React from 'react'
import Person from './Person'

const Persons = (props) => {
    return (
        <div>
            <h2>Numerot</h2>
            <div>
                {props.persons.map(person =>
                    <Person
                        key={person.name}
                        name={person.name}
                        number={person.number}
                        search={props.search}
                    />
                )}
            </div>
        </div>
    )
}

export default Persons