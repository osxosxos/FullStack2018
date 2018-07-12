import React from 'react'
import PropTypes from 'prop-types'
import { filterChange } from './../reducers/filterReducer'

class Filter extends React.Component {

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleChange = (event) => {   
        this.context.store.dispatch(filterChange(event.target.value))
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

Filter.contextTypes = {
  store: PropTypes.string
}

export default Filter


