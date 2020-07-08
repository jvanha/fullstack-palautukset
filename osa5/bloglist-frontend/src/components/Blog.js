import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [ showDetails, setShowDetails ] = useState(false)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async (event) => {
    event.preventDefault()
    updateBlog({
      user: blog.user,
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    })
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  if (showDetails) {
    return (
      <div style={blogStyle}>
        {blog.title}
        <button onClick={() => setShowDetails(false) }>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
        <br />
        {blog.author}
        <br />
        <div style={{ display : (blog.user.username===user.username) ? '' : 'none' }} >
          <button onClick={handleDelete}>delete</button>
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetails(true) }>show</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
export default Blog
