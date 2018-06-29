import React from 'react';
import ReactDOM from 'react-dom';
import PersonForm from './PersonForm'
import SearchForm from './SearchForm'
import Persons from './Persons'

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

    addPerson = (event) => {
        event.preventDefault()
        const name = this.state.newName
        const number = this.state.newNumber

        if (!this.personsContainsName(name)) {
            const newPerson = {
                name: name,
                number: number
            }
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
                    <SearchForm 
                        state={this.state}
                        handleSearchChange ={this.handleSearchChange}
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
                    />}
                </div>
            </div >
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))