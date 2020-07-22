import React, { useState } from 'react'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }
  const padding = {
    padding: 5
  }
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id='username'
            label='username'
            type='text'
            value={username}
            variant="outlined"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <TextField
            id='password'
            label='password'
            type='password'
            variant="outlined"
            value={password} 
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div style={padding}>
          <Button id='login-button' variant='contained' type='submit' color='primary'>
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm