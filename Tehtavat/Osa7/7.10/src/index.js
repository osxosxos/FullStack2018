import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import blogsReducer from './reducers/blogsReducer';
 
const reducer = combineReducers({
  notification: notificationReducer,
  users: usersReducer,
  blogs: blogsReducer
})

ReactDOM.render(
    <Provider store={createStore(reducer)}>
        <App />
    </Provider>,
    document.getElementById('root')
)
