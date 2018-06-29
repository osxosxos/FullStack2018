import React from 'react';
import ReactDOM from 'react-dom';
import PersonForm from './PersonForm'
import SearchForm from './SearchForm'
import Persons from './Persons'
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            newSearch: ''
        }
    }

    componentDidMount() {
        personService
            .getAllPersons()
            .then(response => {
                this.setState({ persons: response.data })
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        const name = this.state.newName
        const number = this.state.newNumber

        if (!this.personsContainsName(name)) {
            const newPerson = {
                name: name,
                number: number
            }
            personService
                .postNewPerson(newPerson)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.concat(response.data),
                        newName: '',
                        newNumber: ''
                    })
                })
        } else {
            const person = this.personsContainsName(name)
            const changedPerson = {
                name: person.name,
                number: this.state.newNumber,
                id: person.id
            }
            this.updatePerson(changedPerson);
        }
    }

    deletePerson = id => () => {
        if (window.confirm(`Haluatko varmasti poistaa tämän henkilön?`)) {
            personService
                .removePerson(id)
                .then(() => {
                    console.log('pöö')
                    const persons = this.state.persons.filter(person => person.id !== id);
                    this.setState({ persons: persons });
                });
        }
    }

    updatePerson = (changedPerson) => {
        personService
            .updatePerson(changedPerson)
            .then(response => {
                this.componentDidMount()
            })
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
                    <SearchForm
                        state={this.state}
                        handleSearchChange={this.handleSearchChange}
                    />
                </div>
                <div>
                    {<PersonForm
                        state={this.state}
                        addPerson={this.addPerson}
                        handleNameChange={this.handleNameChange}
                        handleNumberChange={this.handleNumberChange}
                    />}
                </div>
                <div>
                    {<Persons
                        persons={this.state.persons}
                        search={this.state.newSearch}
                        delete={this.deletePerson}
                    />}
                </div>
            </div >
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))