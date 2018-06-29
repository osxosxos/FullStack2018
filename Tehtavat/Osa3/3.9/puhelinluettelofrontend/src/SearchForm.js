import React from 'react'

const SearchForm = (props) => {
    return (
        <div>
            rajaa näytettäviä:
        <input
                onChange={props.handleSearchChange}
                value={props.state.handleSearchChange}
            />
        </div>
    )
}

export default SearchForm