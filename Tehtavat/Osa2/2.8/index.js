import React from 'react';
import ReactDOM from 'react-dom';

const Person = (props) => {
    return (
        <p>{props.name} {props.number}</p>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    name: 'Arto Hellas',
                    number: '044-123456'
                },
                {
                    name: 'Esko Ukkonen',
                    number: '044-654321'
                }
            ],
            newName: '',
            newNumber: ''
        }
    }

    addNote = (event) => {
        event.preventDefault()
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        if (!this.personsContainsName(this.state.newName)) {
            const persons = this.state.persons.concat(newPerson)
            this.setState({
                persons: persons,
                newName: '',
                newNumber: ''
            })
        }
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    personsContainsName = (name) => {
        return this.state.persons.find(person => person.name === name)
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addNote}>
                    <div>
                        nimi: 
                        <input
                            value={this.state.newName}
                            onChange={this.handleNameChange}
                        />                        
                    </div>
                    <div>
                        numero: 
                        <input
                            value={this.state.newNumber}
                            onChange={this.handleNumberChange}
                        />                        
                    </div>
                    <div>
                        <button type="submit"> lisää </button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <div>
                    {this.state.persons.map(person => 
                        <Person key={person.name} name={person.name} number = {person.number} 
                    />)}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

