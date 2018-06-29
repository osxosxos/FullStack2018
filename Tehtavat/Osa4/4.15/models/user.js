const mongoose = require('mongoose')

const User = mongoose.model('User', {
  username: String,
  password: String,
  name: String,
  adult: Boolean
})

const formatUser = (user) => {
  return {
    id: user.id,
    username: user.username,
    password: user.password,
    name: user.name,
    adult: user.adult
  }
}


module.exports = {User, formatUser }