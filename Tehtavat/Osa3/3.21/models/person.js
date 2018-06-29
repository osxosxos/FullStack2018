const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const url = process.env.MONGODB_URI

console.log('url', url)

mongoose.connect(url)

const Person = mongoose.model('Henkilo', {
    name: String,
    number: String
})

module.exports = Person