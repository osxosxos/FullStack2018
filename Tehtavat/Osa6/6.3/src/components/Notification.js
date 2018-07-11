import React from 'react'
import store from '../store'
import { notificationChange } from '../reducers/notificationReducer'

class Notification extends React.Component {
    
  render() {

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    
    return (
      // Storen kutsu tähän!
      // Notificationin muutos!
      // this.context.store.dispatch(filterChange(value))
      <div style={style}>  
        {store.getState().notification}
      </div>
    )
  }
}

export default Notification
