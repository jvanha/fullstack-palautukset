/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    console.log('init blog', data)
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const createBlog = (object, user) => {
  return async dispatch => {
    try {
      const data = await blogService.create(object)
      data.user = ({
        id: data.user,
        username: user.username
      })
      dispatch({
        type: 'NEW_BLOG',
        data
      })
    } catch(exception) {
      dispatch(setNotification('Bad credentials', true, 5))
    }
  }
}

export const removeBlog = (object) => {
  return async dispatch => {
    try {
      await blogService.remove(object)
      dispatch({
        type: 'REMOVE_BLOG',
        data: object
      })
    } catch (exception) {
      console.log('deletion error')
    }
  }
}

export const updateBlogLikes = (newObject) => {
  return async dispatch => {
    try {
      const data = await blogService.update(newObject)
      dispatch({
        type: 'LIKE_BLOG',
        data
      })
    } catch(exception) {
      console.log('update error')
    }
  }
}

export const addComment = (blog, content) => {
  return async dispatch => {
    const comment = await blogService.comment(blog, content)
    dispatch({
      type: 'COMMENT_BLOG',
      data: {
        blog,
        comment
      }
    })
  }
}

const blogReducer = (state=[], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'LIKE_BLOG':
    const id = action.data.id
    const blogToChange = state.find(blog => blog.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : changedBlog)
  case 'COMMENT_BLOG':
    const commentedBlog = {
      ...action.data.blog,
      comments: action.data.blog.comments.concat(action.data.comment)
    }
    return state.map(blog => blog.id !== action.data.blog.id ? blog : commentedBlog)
  default:
    return state
  }
}

export default blogReducer