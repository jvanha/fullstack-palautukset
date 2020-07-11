let timeoutId 
export const setNotification = (content, time) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET',
      data: { content }
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

const notificationReducer =(state = 'Hello!', action) => {
  switch(action.type) {
    case 'SET':
      return action.data.content
    case 'REMOVE':
      return null
    default:  
    return state
  }
}

export default notificationReducer