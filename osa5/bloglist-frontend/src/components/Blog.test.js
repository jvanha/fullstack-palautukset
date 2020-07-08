import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'test blog',
  author: 'test author',
  likes: 0,
  url: 'www.test.fi',
  user: { username: 'username' }
}

test('renders title and author by default', () => {
  const component = render(
    <Blog blog={blog} user={{}} deleteBlog={() => {}} updateBlog={() => {}} />
  )

  expect(component.container).toHaveTextContent('test blog')
  expect(component.container).toHaveTextContent('test author')
  expect(component.container).not.toHaveTextContent('likes:')
  expect(component.container).not.toHaveTextContent('www.test.fi')
})

test('renders likes and URL when show-button has been clicked', () => {
  const user = {
    username: 'username'
  }
  const component = render(
    <Blog blog={blog} user={user} deleteBlog={() => {}} updateBlog={() => {}} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('test blog')
  expect(component.container).toHaveTextContent('test author')
  expect(component.container).toHaveTextContent('likes')
  expect(component.container).toHaveTextContent('www.test.fi')
})

test('eventhandler is called twice when like-button is clicked twice', () => {
  const user = {
    username: 'username'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} deleteBlog={() => {}} />
  )

  const showButton = component.getByText('show')
  fireEvent.click(showButton)
  //component.debug()
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})