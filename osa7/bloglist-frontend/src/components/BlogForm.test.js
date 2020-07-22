import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('eventHandler is called with correct values', () => {

  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'just testing' }
  })

  fireEvent.change(author, {
    target: { value: 'Testman' }
  })

  fireEvent.change(url, {
    target: { value: 'www.test.fi' }
  })

  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('just testing')
  expect(mockHandler.mock.calls[0][0].author).toBe('Testman')
  expect(mockHandler.mock.calls[0][0].url).toBe('www.test.fi')
  //console.log(mockHandler.mock.calls)
})