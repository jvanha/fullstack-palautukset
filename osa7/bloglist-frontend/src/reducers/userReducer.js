import userService from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data
    })
  }
}

const userReducer = (state=[], action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export default userReducer