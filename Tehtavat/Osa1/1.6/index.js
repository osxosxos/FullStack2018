import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.arvio} {props.maara}</p>
        </div>
    )
}

const Sisalto = (props) => {
    console.log(props)
    return (
        <div>
            <Osa arvio={props.arviot[0]} maara={props.palaute.hyva} />
            <Osa arvio={props.arviot[1]} maara={props.palaute.neutraali} />
            <Osa arvio={props.arviot[2]} maara={props.palaute.huono} />
        </div>
    )
}

const Nappi = (props) => {
    return (
        <button onClick={props.toiminto}>
            {props.teksti}
        </button>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            arviot: ["Hyvä", "Neutraali", "Huono"],
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }
    hyvaPlus = () => {
        this.setState({ hyva: this.state.hyva + 1 })
    }
    neutraaliPlus = () => {
        this.setState({ neutraali: this.state.neutraali + 1 })
    }
    huonoPlus = () => {
        this.setState({ huono: this.state.huono + 1 })
    }

    render() {
        return (
            <div>
                <div>
                    <Otsikko otsikko={"Anna palautetta"} />
                    <Nappi toiminto={this.hyvaPlus} teksti={this.state.arviot[0]} />
                    <Nappi toiminto={this.neutraaliPlus} teksti={this.state.arviot[1]} />
                    <Nappi toiminto={this.huonoPlus} teksti={this.state.arviot[2]} />
                    <Otsikko otsikko={"Palautetilasto"} />
                    <Sisalto arviot={this.state.arviot} palaute={this.state} />
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)