let timeoutId
export const setNotification = (content, errorValue, time) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET',
      data: {
        content,
        errorValue
      }
    })
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, 1000*time)
  }
}

export const setTimeoutId = (id) => {
  return {
    type: 'SET_TIMEOUT',
    data: { id }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET':
    return {
      content: action.data.content,
      errorValue: action.data.errorValue
    }
  case 'REMOVE':
    return null
  default:
    return state
  }
}

export default notificationReducer