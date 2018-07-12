import React from 'react'
import store from '../store'
import { filterChange } from './../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
        store.dispatch(filterChange(event.target.value))
    }

    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                {'Filter: '} <input onChange={this.handleChange} />
            </div>
        )
    }
}

export default Filter