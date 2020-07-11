
export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    data: { content }
  }
}

export const resetFilter = () => {
  return {
    type: 'RESET_FILTER'
  }
}

const filterReducer = (state ='', action) => {
  switch(action.type) {
    case 'RESET_FILTER':
      return ''
    case 'SET_FILTER':
      return action.data.content
    default:
      return state
  }
}

export default filterReducer