import loginService from '../services/login'
import { setNotification } from './notificationReducer'


export const login = (credentials) => {
  return async dispatch => {
    try {
      const data = await loginService.login(credentials)
      dispatch({
        type: 'LOGIN',
        data
      })
      dispatch(setNotification('Logged in successfully', false, 3))
      window.localStorage.setItem('loggedUser', JSON.stringify(data))
    } catch(exception) {
      dispatch(setNotification('Wrong username or password', true, 3))
    }
  }
}

export const setUser = (data) => {
  return dispatch => {
    dispatch ({
      type: 'SET_USER',
      data
    })
  }
}
export const logout = () => {
  return dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}
const userReducer = (state=null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export default userReducer