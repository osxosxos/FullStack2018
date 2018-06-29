import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.arvio} </td>
            <td>{props.maara} {props.muuta}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const summa = props.palaute.hyva + props.palaute.neutraali + props.palaute.huono
    const painotettuSumma = props.palaute.hyva - props.palaute.huono
    const positiivisia = props.palaute.hyva / summa
    if (summa === 0) {
        return (
            <div>
                <em>Ei yhtään palautetta annettu.</em>
            </div>
        )
    }
    return (
        <table>
            <tbody>
                <Statistic arvio={props.arviot[0]} maara={props.palaute.hyva} />
                <Statistic arvio={props.arviot[1]} maara={props.palaute.neutraali} />
                <Statistic arvio={props.arviot[2]} maara={props.palaute.huono} />
                <Statistic arvio={"Keskiarvo "} maara={Math.round(painotettuSumma / summa * 100) / 100} />
                <Statistic arvio={"Positiivisia "} maara={Math.round(100 * positiivisia)} muuta={" %"} />
            </tbody>
        </table>
    )
}

const Button = (props) => {
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
            huono: 0,
        }
    }

    kasvata = (muuttuja) => () => {
        this.setState({ [muuttuja]: this.state[muuttuja] + 1 })
    }

    render() {
        return (
            <div>
                <Otsikko otsikko={"Anna palautetta"} />
                <Button toiminto={this.kasvata('hyva')} teksti={this.state.arviot[0]} />
                <Button toiminto={this.kasvata('neutraali')} teksti={this.state.arviot[1]} />
                <Button toiminto={this.kasvata('huono')} teksti={this.state.arviot[2]} />
                <Otsikko otsikko={"Palautetilasto"} />
                <Statistics arviot={this.state.arviot} palaute={this.state} />
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)