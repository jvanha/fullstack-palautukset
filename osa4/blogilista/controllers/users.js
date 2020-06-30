const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password === undefined) {
    return response.status(400).json({ error: 'password missing' })
  }
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long'})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  console.log('password:', body.password)
  console.log('hash:', passwordHash)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter