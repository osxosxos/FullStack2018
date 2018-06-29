const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {

    const user = await User.findOne({ username: request.body.username })

    if (user === null) {
        return response.status(401).send({ error: 'invalid username' })
    }

    const compare = await bcrypt.compare(request.body.password, user.password)

    if (!compare) {
        return response.status(401).send({ error: 'invalid password' })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter