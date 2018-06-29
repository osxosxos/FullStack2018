import React from 'react';
import ReactDOM from 'react-dom';
import PersonForm from './PersonForm'
import SearchForm from './SearchForm'
import Persons from './Persons'
import personService from './services/persons'
import './index.css';

const Notification = (props) => {
    if (props.message === null) {
        return null
    }
    return (
        <div className="notice">
            {props.message}
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            newSearch: '',
            notice: null
        }
    }

    makeNoticeEmpty() {
        setTimeout(() => {
            this.setState({ notice: null })
        }, 5000)
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
                        newNumber: '',
                        notice: 'Henkilön lisäys onnistui!'
                    })
                    this.makeNoticeEmpty()
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
                    this.setState({
                        notice: 'Henkilön poisto onnistui!'
                    })
                    this.makeNoticeEmpty()
                    this.componentDidMount()
                });
        }
    }

    updatePerson = (changedPerson) => {
        personService
            .updatePerson(changedPerson)
            .then(response => {
                this.setState({
                    notice: 'Henkilön päivitys onnistui!'
                })
                this.makeNoticeEmpty()
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
                <Notification message={this.state.notice} />
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