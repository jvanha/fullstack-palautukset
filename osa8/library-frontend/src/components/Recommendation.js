import React, { useEffect, useState } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`
const BOOKS = gql`
  query booksOfFavoriteGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`
const Recommendation = (props) => {
  const [ genre, setGenre ] = useState(null)
  const meResult = useQuery(ME)
  const [ getBooks, booksResult ] = useLazyQuery(BOOKS)
  
  useEffect(() => {
    if (meResult.data && meResult.data.me) {
    getBooks({ variables: { genre: meResult.data.me.favoriteGenre }})
    setGenre(meResult.data.me.favoriteGenre)
    }
  }, [meResult.data]) // eslint-disable-line

  if (!props.show || meResult.loading || booksResult.loading) {
    return null
  }
  console.log(meResult.data)
  
  const books = booksResult.data.allBooks
  return (
    <div>
      <h1>Recommendations</h1>
      <p>Books in your favorite genre <b>{genre}</b></p>
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
    </div>
  )
}

export default Recommendation