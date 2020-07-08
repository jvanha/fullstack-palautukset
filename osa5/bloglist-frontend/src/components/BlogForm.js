import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input id='title' type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input id='author' type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          URL
          <input id='url' type='text' value={url} name='url' onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button id='submit-blog' type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default BlogForm