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
            selected: 0,
            paras: 0,
            pisteet: []
        }
        for (var i = 0; i < props.anecdotes.length; i++) {
            this.state.pisteet.push(0);
        }
    }

    aanesta = () => {
        const pisteet = this.state.pisteet;
        let paras = this.state.paras
        const selected = this.state.selected

        pisteet[this.state.selected] = pisteet[this.state.selected] + 1

        if (this.state.pisteet[selected] > this.state.pisteet[paras]) {
            paras = selected
            
        }
        console.log("paras", paras)
        this.setState({ pisteet,paras })
    }

    muutaArvo = (muuttuja, arvo) => () => {
        this.setState({ [muuttuja]: arvo })
    }

    render() {
        const random = Math.round((Math.random() * 5))
        return (
            <div>
                <em><h3>{this.props.anecdotes[this.state.selected]}</h3></em>
                <h4> Tykkäyksiä: {this.state.pisteet[this.state.selected]}</h4>
                <button onClick={this.muutaArvo('selected', random)}>
                    <h2>Uusi anekdootti</h2>
                </button>
                <button onClick={this.aanesta}>
                    <h2>Tykkää</h2>
                </button>
                <h3>Anekdootti, jolla eniten ääniä: <em>{this.props.anecdotes[this.state.paras]}</em></h3>
            </div>
        )
    }
}

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)