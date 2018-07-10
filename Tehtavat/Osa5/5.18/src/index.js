import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = (props) => {

    const hyvat = store.getState().good
    const pahat = store.getState().bad
    const rumat = store.getState().ok
    const palautteita = hyvat + pahat + rumat
    const keskiarvo = Math.floor(100 * (1 * hyvat - 1 * pahat) / palautteita) / 100
    const hyvienosuus = Math.floor((100 * hyvat) / palautteita) / 100

    if (palautteita === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{hyvat}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{rumat}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{pahat}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{keskiarvo}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{hyvienosuus}{' %'}</td>
                    </tr>
                </tbody>
            </table>

            <button onClick = {props.klik('ZERO')} >nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {

    klik = (nappi) => () => {
        switch (nappi) {
            case 'GOOD':
                return store.dispatch({ type: 'GOOD' })
            case 'OK':
                return store.dispatch({ type: 'OK' })
            case 'BAD':
                return store.dispatch({ type: 'BAD' })
        }
        return store.dispatch({ type: 'ZERO' })
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka klik={this.klik} />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)