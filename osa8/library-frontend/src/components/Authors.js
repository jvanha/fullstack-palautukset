  
import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
      id
    }
  }
`
const EDIT_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ){
      name
    }
  }
`
const Authors = (props) => {
  
  const [ updateAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  
  const result = useQuery(ALL_AUTHORS)

  const [ author, setAuthor ] = useState('choose author')
  const [ year, setYear ] = useState('')

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>LOADING...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name: author, setBornTo: Number(year) } })
    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          author 
          <select value={author} onChange={({ target }) => setAuthor(target.value)}>
          <option></option>
            { authors.map(author =>
              <option key={author.id} value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          < input type='number' value={year} onChange={({ target }) => setYear(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
