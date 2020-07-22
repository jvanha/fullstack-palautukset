import React, {  useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import Nav from './components/Nav'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import { initializeUsers } from './reducers/userReducer'
import { Container, TableContainer, Table, TableBody, TableCell, TableRow } from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)

  useEffect(() => {
    //console.log(window.localStorage.getItem('loggedUser'))
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const blogFormRef = useRef()

  const match = useRouteMatch('/users/:id')
  const matchedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  const match2 = useRouteMatch('/blogs/:id')
  const matchedBlog = match2
    ? blogs.find(blog => blog.id === match2.params.id)
    : null

  if (user === null) {
    return (
      <Container>
        <Notification />
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container>
      <Notification />
      <Nav />
      <Switch>
        <Route path ='/users/:id'>
          <User user = {matchedUser} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog = {matchedBlog} />
        </Route>
        <Route path='/'>
          <h1>Blogs</h1>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm user={user} />
          </Togglable>
          <TableContainer>
            <Table>
              <TableBody>
                {[...blogs].sort((blog1,blog2) => (blog2.likes-blog1.likes)).map(blog =>
                  <TableRow key={blog.id} >
                    <TableCell>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell>
                      {blog.user.name}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Route>
      </Switch>
    </Container>
  )
}

export default App