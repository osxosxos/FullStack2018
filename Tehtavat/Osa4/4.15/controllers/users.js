const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User, formatUser } = require('../models/user')

usersRouter.get('/', (request, response) => {
    User.find({}).then(users => { response.json(users.map(formatUser)) })
})

usersRouter.post('/', async (request, response) => {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

    const user = new User({
        username: request.body.username,
        password: passwordHash,
        name: request.body.name,
        adult: request.body.adult
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter