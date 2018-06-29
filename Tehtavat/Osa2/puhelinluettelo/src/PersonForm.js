import React from 'react'

const PersonForm = (props) => {
    return (
        <div>
            <h2>Lisää uusi</h2>
            <form onSubmit={props.addPerson}>
                <div>
                    nimi: <input
                        onChange={props.handleNameChange}
                        value={props.state.handleNameChange}
                    />
                </div>
                <div>
                    numero: <input
                        onChange={props.handleNumberChange}
                        value={props.state.handleNumberChange}
                    />
                </div>
                <button type="submit">lisää numero</button>
            </form>
        </div>
    )
}

export default PersonForm