import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)
  const [errorValue, setErrorValue] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    console.log(window.localStorage.getItem('loggedUser'))
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      console.log(window.localStorage.getItem('loggedUser'))
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('Logged in successfully')
      setErrorValue(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification('Wrong username or password')
      setErrorValue(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      blogService.setToken(user.token)
      const blog = await blogService.create(newBlog)

      blog.user = ({
        id: blog.user,
        username: user.username
      })

      setBlogs(blogs.concat(blog))
      setNotification(`New blog ${blog.title} by ${blog.author} added`)
      setErrorValue(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification('Bad credentials')
      setErrorValue(true)
      console.log('bad credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleBlogUpdate = async (newBlog) => {
    try {
      blogService.setToken(user.token)
      console.log('newBlog', newBlog)
      await blogService.update(newBlog)
      let blogsCopy = [...blogs]
      blogsCopy = blogsCopy.filter(blog => blog.id!==newBlog.id)
      setBlogs(blogsCopy.concat(newBlog))
    } catch (exception) {
      console.log('update error')
    }
  }

  const handleBlogDelete = async (blog) => {
    blogService.setToken(user.token)
    try {
      await blogService.remove(blog)
      setBlogs([...blogs].filter(b => b.id!==blog.id))
    } catch (exception) {
      console.log('deletion error')
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <Notification message={notification} errorValue={errorValue} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input id='username' type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input id='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <div>
            <button id='login-button' type='submit'>login</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} errorValue={errorValue} />
      <p>{user.name} logged in.</p>
      <div>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleNewBlog} />
      </Togglable>
      {[...blogs].sort((blog1,blog2) => (blog2.likes-blog1.likes)).map(blog =>
        <Blog key={blog.id} user={user} blog={blog} updateBlog={handleBlogUpdate} deleteBlog = {handleBlogDelete}/>
      )}
    </div>
  )
}

export default App