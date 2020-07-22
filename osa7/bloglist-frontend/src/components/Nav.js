import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { AppBar, IconButton, Button, Toolbar } from '@material-ui/core'

const Nav = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
        </IconButton>
        <Button color='inherit' component={Link} to='/'>blogs</Button>
        <Button color='inherit' component={Link} to='/users'>users</Button>
        {user
          ? <><em>{user.name} logged in </em>
            <Button color='inherit' onClick={handleLogout}>logout</Button></>
          : <Button color='inherit' component={Link} to='/login'>login</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Nav