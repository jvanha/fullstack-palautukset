const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  console.log('cleared')
})
describe('adding a new user', () => { 
  test('fails with status code 400 and error message if username is missing', async () => {
    const user = { 
      name: 'name',
      password: '1234'
    }

    const response = await api.post('/api/users').send(user).expect(400)
    console.log(response.body)
    expect(response.body.error).toBeDefined()
  })

  test('fails with status code 400 and error message if username is too short', async () => {
    const user = {
      username: 'JJ', 
      name: 'name',
      password: '1234'
    }

    const response = await api.post('/api/users').send(user).expect(400)
    console.log(response.body)
    expect(response.body.error).toBeDefined()
  })

  test('fails with status code 400 and error message if password is missing', async () => {
    const user = {
      username: "username",
      name: 'name'
    }

    const response = await api.post('/api/users').send(user).expect(400)
    expect(response.body.error).toBeDefined()
  })
  
  test('fails with status code 400 and error message if password is too short', async () => {
    const user = {
      username: "username",
      name: 'name',
      password: '12'
    }

    const response = await api.post('/api/users').send(user).expect(400)
    expect(response.body.error).toBeDefined()
  })
})


afterAll(() => {
  mongoose.connection.close()
})