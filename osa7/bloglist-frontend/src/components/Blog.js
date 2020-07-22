import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, updateBlogLikes, addComment } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const [comment, setComment] = useState('')

  const handleLike = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    dispatch(updateBlogLikes({
      user: blog.user,
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    }))
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    dispatch(removeBlog(blog))
  }

  const handleComment = async (event) => {
    event.preventDefault()
    dispatch(addComment(blog, { content: comment }))
    setComment('')
  }

  if(!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes {blog.likes}
      <button onClick={handleLike}>like</button>
      <br />
      added by {blog.author}
      <br />
      <div style={{ display : (blog.user.username===user.username) ? '' : 'none' }} >
        <button onClick={handleDelete}>delete</button>
      </div>
      <form onSubmit={handleComment}>
        <input value={comment} onChange={({ target }) => setComment(target.value)} />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )

}

export default Blog
