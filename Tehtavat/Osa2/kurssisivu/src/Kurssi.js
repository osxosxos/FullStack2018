import React from 'react';

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

export default Kurssi