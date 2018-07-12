import React from 'react'
import store from '../store'
import { filterChange } from './../reducers/notificationReducer'

class Filter extends React.Component {
    handleChange = (event) => {
        console.log(event.target.value)
        store.dispatch(filterChange(event.target.value))
    }

    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                filter <input onChange={this.handleChange} />
            </div>
        )
    }
}