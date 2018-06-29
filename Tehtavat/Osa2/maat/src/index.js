import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const SearchForm = (props) => {
    return (
        <div>
            Find a country:
            <input
                onChange={props.handleSearchChange}
                value={props.state.handleSearchChange}
            />
        </div>
    )
}

const CountryList = (props) => {
    if (props.countries.length === 0) {
        return (
            <div>
                no matches, specify another filter
          </div>
        )
    } else if (props.countries.length > 1 && props.countries.length < 11) {
        return (
            <div>
                {props.countries.map(country =>
                    <div key={country.name} onClick={props.goToCountry(country.name)} >
                        {country.name}
                    </div>
                )}
            </div>
        )
    } else if (props.countries.length > 10) {
        return (
            <div>
                too many matches, specify another filter
          </div>
        )
    } else {
        return (
            <Country country={props.countries[0]} />
        )
    }
}

const Country = (props) => {
    return (
        <div>
            <h1>{props.country.name} {props.country.nativeName}</h1>
            <p>capital: {props.country.capital}</p>
            <p>population: {props.country.population}</p>
            <img src={props.country.flag} width={200} />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newSearch: '',
            countries: []
        }
    }

    componentWillMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({ countries: response.data })
            })
    }

    handleSearchChange = (event) => {
        this.setState({ newSearch: event.target.value })
    }

    goToCountry = (country) => () => {
        this.setState({ newSearch: country.toLowerCase() })
    }

    render() {
        const filter = this.state.newSearch.toLocaleLowerCase()
        const filteredCountries
            = this.state.countries.filter
                (country => country.name.toLocaleLowerCase().includes(filter))

        return (
            <div>
                <h1>Countries of the Planet Earth</h1>
                <div>
                    <SearchForm
                        state={this.state}
                        handleSearchChange={this.handleSearchChange}
                    />
                </div>
                <div>
                    <CountryList
                        countries={filteredCountries}
                        goToCountry={this.goToCountry}
                    />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
