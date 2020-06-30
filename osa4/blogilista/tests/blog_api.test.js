const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const api = supertest(app)

let userId = ''

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWQiOiI1ZWU3OWUyNjM4MmQyNzExNTRjYzZmY2UiLCJpYXQiOjE1OTIyMzc2MDd9.HJw_dcS4pGKl6O22LA6oVfJ3aP7sgd1qF5abKmi0ooQ'

let initialBlogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0, user: userId }, 
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0, user: userId },
  { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0, user: userId },
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0, user: userId },
  { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0, user: userId },
  { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0, user: userId }
]
const user = ({
  username: 'username',
  name: 'name',
  password: 'password'
})

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')
  const blogObjects = initialBlogs.map(blog => new Blog({
    id_: blog.id_,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    __v: blog.__v,
    user: userId
  }))
  //console.log('blogObjects length: ', blogObjects.length)
  const promiseArray = blogObjects.map(blog => blog.save())
  console.log('saving')
  await Promise.all(promiseArray)
  console.log('done')
  
})

beforeAll(async () => {
  await User.deleteMany({})
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('password', saltRounds)
  
  const user = new User({
    username: 'username',
    name: 'name',
    passwordHash
  })
  const savedUser = await user.save()
  userId = savedUser._id

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'username', password: 'password' })
  
  token = loginResponse.body.token
})


test('Blogs are returned in JSON format', async () => {
  console.log('test entered')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('All blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('Blogs are identified by a field called id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('A valid blogs can be added', async () => {

  const newBlog = { 
    title: 'a new blog',
    author: 'an author',
    url: 'url',
    likes: '0',
  }
  await api.post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('Initial number of likes equals zero when undefined', async () => {

  const newBlog = { 
    title: 'an another new blog',
    author: 'an another author',
    url: 'url'
  }
  const response = await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(newBlog)
  console.log('test body:',response.body)
  expect(response.body.likes).toEqual(0)
})

test('field title is mandatory, status code 400 expected', async () => {
  const newBlog = {
    author: 'yet another author',
    url: "url",
    likes: 0
  }

  await api.post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(newBlog)
    .expect(400)
})

test('missing url should induce status code 400', async () => {
  const newBlog = {
    title: "title",
    author: 'yet another author',
    likes: 0
  }

  await api
  .post('/api/blogs')
  .set({ Authorization: `Bearer ${token}` })
  .send(newBlog)
  .expect(400)
})

test('adding a valid blog without a token fails with stauscode 401', async () => {
  const newBlog = { 
    title: 'a new blog',
    author: 'an author',
    url: 'url',
    likes: '0',
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('blogs can be deleted', async () => {
  const blogs = await Blog.find({})

  const blogId = blogs[0]._id

  await api
    .delete(`/api/blogs/${blogId}`)
    .set({ Authorization: `Bearer ${token}` })
    .expect(204)
  
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length - 1)
})

test('blogs can be updated', async () => {
  const blogs = await Blog.find({})
  const blogId = blogs[0]._id
  
  const newBlog = { 
    title: 'a new blog',
    author: 'an author',
    url: 'url',
    likes: 0
  }
  
  await api
    .put(`/api/blogs/${blogId}`)
    .set({ Authorization: `Bearer ${token}` })
    .send(newBlog)
  
  const response = await api.get('/api/blogs')
  expect(response.body.map(blog => blog.title)).toContain(newBlog.title)
  expect(response.body.map(blog => blog.author)).toContain(newBlog.author)
  expect(response.body.map(blog => blog.url)).toContain(newBlog.url)
  expect(response.body.map(blog => blog.likes)).toContain(newBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})