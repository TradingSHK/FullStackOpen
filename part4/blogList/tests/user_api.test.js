const bcrypt = require('bcrypt')
const User = require('../models/user')
const { test, beforeEach, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')

const api = supertest(app)

describe("when there are two users in the db", async() => {
    let testUsername = 'root'

    beforeEach(async () => {
        await User.deleteMany({})
        
        testUsername = `root_${Date.now()}`
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({username: testUsername, passwordHash})

        await user.save()
    })

    test("invalid username length", async() => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: "he",
            name: 'HeHe',
            password: "TestTest"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(500)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test("password too short", async() => {
        const usersAtStart = await helper.usersInDb()
        console.log(usersAtStart);
        const newUser = {
            username: "tests",
            name: "tests",
            password: "re"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        const usersAtEnd = await helper.usersInDb()        
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
  await mongoose.connection.close()
})