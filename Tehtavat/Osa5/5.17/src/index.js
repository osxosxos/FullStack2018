import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {

    const palautteita = 0

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
                        <td></td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <button>nollaa tilasto</button>
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
                <Statistiikka />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)