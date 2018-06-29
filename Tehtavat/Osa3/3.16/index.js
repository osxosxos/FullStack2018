
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :person :status :response-time'))
app.use(express.static('build'))

morgan.token('person', function (req) { return JSON.stringify(req.body) })

const Person = require('./models/person')

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

const info = () => {
    return `
      <div>
          <p>puhelinluettelossa on nyt nimiä: ${persons.length}</p>
          <p>tänään on: ${Date()}</p>
      </div>
    `
}

const generateId = () => {
    return Math.floor(Math.random() * 100000)
}

app.get('/info', (req, res) => {
    res.send(info())
})

app.get('/persons', (req, res) => {
    Person.find({}).then(henkilos => {
        res.json(henkilos.map(formatPerson))
    })
})

app.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }

})

app.delete('/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id).then(result => {res.status(204).end()})
})

app.post('/persons', (req, res) => {

    if (req.body.name === undefined || req.body.name === "") {
        return res.status(400).json({ error: 'name missing' })
    }

    if (req.body.number === undefined || req.body.number === "") {
        return res.status(400).json({ error: 'number missing' })
    }

    const person = new Person ({
        name: req.body.name,
        number: req.body.number 
    })

    person.save().then(savedPerson => {res.json(formatPerson(savedPerson))})

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

