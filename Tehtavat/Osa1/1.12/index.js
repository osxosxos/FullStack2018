import React from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0
        }
    }

    uusiAnekdootti = (random) => {
        console.log("random:",random)
        return () => {
            this.setState({ selected: random })
        }
    }

    render() {
        return (
            <div>
                <em><h3>{this.props.anecdotes[this.state.selected]}</h3></em>
                <p></p>
                <button onClick={this.uusiAnekdootti(Math.round((Math.random() * 5) ))}>
                    <h1>Uusi anekdootti</h1>
                </button>
            </div>
        )
    }
}

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)