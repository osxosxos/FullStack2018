import React from 'react'
import store from '../store'

class Notification extends React.Component {

  render() {
    
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    return (
      <div style={style}>
        {store.getState().notification}
      </div>
    )
  }
}

export default Notification
