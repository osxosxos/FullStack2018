const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User, formatUser } = require('../models/user')

usersRouter.get('/', (request, response) => {
    User.find({}).then(users => { response.json(users.map(formatUser)) })
})

usersRouter.post('/', async (request, response) => {

    if (request.body.password.length < 3) {
        return response.status(400).json({ error: 'password is too short' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
    const existingUser = await User.find({ username: request.body.username })

    let user = new User({
        username: request.body.username,
        password: passwordHash,
        name: request.body.name,
        adult: request.body.adult
    })

    if (request.body.adult === undefined) {
        user.adult = true
    }

    if (existingUser.length > 0) {
        return response.status(400).json({ error: 'username must be unique' })
    }

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter