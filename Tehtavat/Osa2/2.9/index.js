import React from 'react';
import ReactDOM from 'react-dom';

const Persons = () => {

}

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
                    name: 'Arto Aro',
                    number: '044-987654'
                },
                {
                    name: 'Esko Ukkonen',
                    number: '044-654321'
                }
            ],
            newName: '',
            newNumber: '',
            newSearch: ''
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

    handleSearchChange = (event) => {
        this.setState({ newSearch: event.target.value })
    }

    personsContainsName = (name) => {
        return this.state.persons.find(person => person.name === name)
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <div>
                    rajaa näytettäviä:
                    <input
                        value={this.state.newSearch}
                        onChange={this.handleSearchChange}
                    />
                </div>
                <h2>Lisää uusi</h2>
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
                        <Person
                            key={person.name}
                            name={person.name}
                            number={person.number}
                            search={this.state.newSearch}
                        />
                    )}
                </div>
            </div >
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

