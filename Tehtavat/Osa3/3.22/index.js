
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

const Info = (props) => {
    return `puhelinluettelossa on nyt nimiä: ${props}. Tänään on: ${Date()}`
}

const generateId = () => {
    return Math.floor(Math.random() * 100000)
}

app.get('/info', (req, res) => {
    Person.find({}).then(henkilos => {
        res.json(`${Info(length = henkilos.length)}`)
    })
})

app.get('/persons', (req, res) => {
    Person.find({}).then(henkilos => {
        res.json(henkilos.map(formatPerson))
    })
})

app.get('/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => { res.json(formatPerson(person)) })
})

app.delete('/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id).then(result => { res.status(204).end() })
})

app.post('/persons', (req, res) => {

    if (req.body.name === undefined || req.body.name === "") {
        return res.status(400).json({ error: 'name missing' })
    }

    if (req.body.number === undefined || req.body.number === "") {
        return res.status(400).json({ error: 'number missing' })
    }

    if (typeof (req.body.number) !== 'string') {
        return res.status(400).json({ error: 'only one number allowed' })
    }

    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })

    person.save().then(savedPerson => { res.json(formatPerson(savedPerson)) })

})

app.put('/persons/:id', (req, res) => {

    if (typeof (req.body.number) !== 'string') {
        return res.status(400).json({ error: 'only one number allowed' })
    }

    const person = {
        name: req.body.name,
        number: req.body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(formatPerson(updatedPerson))
        })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})