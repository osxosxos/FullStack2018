
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(morgan(':method :url :person :status :response-time'))

morgan.token('person', function (req) { return JSON.stringify(req.body)})

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }
]

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
    console.log(info)
    res.send(info())
})

app.get('/persons', (req, res) => {
    res.json(persons)
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
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/persons', (req, res) => {

    if (req.body.name === undefined) {
        return res.status(400).json({ error: 'name missing' })
    }

    if (req.body.number === undefined) {
        return res.status(400).json({ error: 'number missing' })
    }

    if (persons.find(person => person.name === req.body.name)) {
        const name = req.body.name
        return res.status(400).json({ error: 'phonebook already contains name ', name })
    }

    const person = {
        name: req.body.name,
        number: req.body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

