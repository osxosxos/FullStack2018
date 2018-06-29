import React from 'react';
import ReactDOM from 'react-dom';

const Kurssit = (props) => {
    const kurssit = props.kurssit
    return (
        <div>
            <h1>Opetusohjelma</h1>
            {kurssit.map(kurssi => <Kurssi
                key={kurssi.id}
                nimi={kurssi.nimi}
                osat={kurssi.osat}
            />)}
        </div>
    )
}

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko nimi={props.nimi} />
            <Sisalto osat={props.osat} />
            <Yhteensa osat={props.osat} />
        </div>
    )
}

const Yhteensa = (props) => {
    const osat = props.osat
    const yhteensa = osat.reduce((summa, seuraava) => {
        summa = summa + seuraava.tehtavia
        return summa;
    }, 0)

    return (
        <div>yhteensä {yhteensa} tehtävää </div>
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
    console.log(props)
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
    const kurssit = [
        {
            nimi: 'Half Stack -sovelluskehitys',
            id: 1,
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
        },
        {
            nimi: 'Node.js',
            id: 2,
            osat: [
                {
                    nimi: 'Routing',
                    tehtavia: 3,
                    id: 1
                },
                {
                    nimi: 'Middlewaret',
                    tehtavia: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <Kurssit kurssit={kurssit} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

