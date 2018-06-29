import React from 'react';
import ReactDOM from 'react-dom';

const Person = (props) => {
    return (
        <p>{props.name}</p>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' },
                { name: 'Esko Ukkonen' }
            ],
            newName: ''
        }
    }

    addNote = (event) => {
        event.preventDefault()
        const newPerson = {
            name: this.state.newName
        }

        const persons = this.state.persons.concat(newPerson)

        this.setState({
            persons: persons,
            newName: ''
        })
    }

    handlePersonChange = (event) => {
        this.setState({ newName: event.target.value })
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
                            onChange={this.handlePersonChange}
                        />
                    </div>
                    <div>
                        <button type="submit"> lisää </button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <div>
                    {this.state.persons.map(person => <Person key={person.name} name={person.name} />)}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

