import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Button } from '@material-ui/core'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    const object = ({
      title: title,
      author: author,
      url: url
    })
    try {
      dispatch(createBlog(object, user))
      dispatch(setNotification(`New blog ${title} by ${author} added`, false, 5))
    } catch(err) {
      dispatch(setNotification('Bad credentials', true, 5))
      console.log('bad credentials')
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            id='title'
            label='title'
            type='text'
            value={title}
            name='Title'
            variant="outlined"
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <TextField
            id='author'
            label='author'
            type='text'
            value={author}
            name='Author'
            variant="outlined"
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <TextField
            id='url'
            label='URL'
            type='text'
            value={url}
            name='url'
            variant="outlined"
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div style={padding} >
          <Button id='submit-blog' variant='contained' color='primary' type='submit'>
            create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm