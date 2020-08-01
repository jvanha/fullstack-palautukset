import React, { useState, useEffect } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'


const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
const BOOKS_BY_GENRE = gql`
  query booksByGenre ($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`

const Books = (props) => {
  const [ genre, setGenre ] = useState('all')
  const [ result, setResult ] = useState()
  const [getBooks, booksByGenreResult ]  = useLazyQuery(BOOKS_BY_GENRE)
  const allBooksResult = useQuery(ALL_BOOKS)


  useEffect(() => {
    if (allBooksResult.data) {
      setResult(allBooksResult)
    }
  }, [allBooksResult.data]) // eslint-disable-line


  useEffect(() => {
    if (booksByGenreResult.data) {
      console.log('booksByGenreResult', booksByGenreResult.data)
      setResult(booksByGenreResult)
    }

  }, [booksByGenreResult.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (allBooksResult.loading || booksByGenreResult.loading) {
    return <div>LOADING...</div>
  }
  
  const genres = new Set(allBooksResult.data.allBooks.map(book => book.genres).flat(1))
  const books = result.data.allBooks

  const showAll = () => {
    getBooks({})
    setGenre('all')
  }
  const changeGenre = (genre) => {
    getBooks({ variables: { genre: genre }})
    setGenre(genre)
  }
  return (
    <div>
      <h2>books</h2>
      {genre==='all' 
        ? <p>in all genres</p>
        : <p>in genre <b>{genre}</b></p>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {[...genres].map(genre => 
        <button key={genre} onClick={() => changeGenre(genre) }>{genre}</button>
      )}
      <button onClick={() => showAll()}>all</button>
    </div>
  )
}

export default Books