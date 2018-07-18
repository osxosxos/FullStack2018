const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { User } = require('../models/user')
const { usersInDatabase } = require('./tests_helper')

describe.only('when there is initially one user at db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({
            username: 'FirstUser',
            password: 'lolrofl',
            name: 'Esko Karvinen',
            adult: true
        })
        await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {

        const usersBeforeOperation = await usersInDatabase()

        const newUser = new User({
            username: 'SecondUser',
            password: 'asfasd',
            name: 'Kalle Eskonen',
            adult: true
        })

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDatabase()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })

    test('POST /api/users does not succeed if username is already taken', async () => {

        const newUser = new User({
            username: 'FirstUser',
            password: 'lolrofl',
            name: 'Esko Karvinen',
            adult: true
        })

        const usersBeforeOperation = await usersInDatabase()

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'username must be unique' })

        const usersAfterOperation = await usersInDatabase()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)

    })

    test('POST /api/users sets variable adult as true, if not defined', async () => {
        
        const usersBeforeOperation = await usersInDatabase()

        const newUser = new User({
            username: 'ThirdUser',
            password: 'trolololol',
            name: 'Antti Anttila',
        })

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDatabase()
        const antti = usersAfterOperation.find(user => user.username === 'ThirdUser')
        expect(antti.adult).toBe(true)

    })

    test('POST /api/users does not succeed if password is too short', async () => {
        
        const usersBeforeOperation = await usersInDatabase()

        const newUser = new User({
            username: 'FourthUser',
            password: 'ab',
            name: 'Hän Mies',
        })

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'password is too short' })
        const usersAfterOperation = await usersInDatabase()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)

    })

    afterAll(() => {
        server.close(true)
    })
})