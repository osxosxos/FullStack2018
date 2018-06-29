const mongoose = require('mongoose')

const url = 'mongodb://PerttiKeinonen:TuomionPaiva1995@ds259410.mlab.com:59410/persons'

mongoose.connect(url)

const Person = mongoose.model('Henkilo', {
    name: String,
    number: String
})

module.exports = Person