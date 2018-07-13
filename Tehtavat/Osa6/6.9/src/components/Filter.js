import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from './../reducers/filterReducer'

class Filter extends React.Component {

    handleChange = (event) => {
        this.props.filterChange(event.target.value)
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

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}

const ConnectedFilter = connect(
    mapStateToProps,
    { filterChange }
)(Filter)

export default ConnectedFilter



