import React from 'react';
import ReactDOM from 'react-dom';

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko nimi={props.kurssi.nimi} />
            <Sisalto osat={props.kurssi.osat} />
            <Yhteensa osat={props.kurssi.osat} />
        </div>
    )
}

const Yhteensa = (props) => {
    const osat = props.osat
    let x = 0
    for (var i = 0; i < osat.length; i++) {
        x = x + osat[i].tehtavia
    }
    return (
        <div>
            <p>Yhteensä {x} tehtävää</p>
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.nimi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    const osat = props.osat
    return (
        <div>
            {osat.map(osa => <Osa
                key={osa.id}
                nimi={osa.nimi}
                tehtavia={osa.tehtavia}
            />)}
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.nimi} {props.tehtavia}</p>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

