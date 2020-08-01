import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription, gql} from '@apollo/client'
import Recommendation from './components/Recommendation'

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
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
const BOOKS = gql`
  query booksInGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`
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
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  
  const includedIn = (set, object) => {
    set.map(p => p.id).includes(object.id)
  }
  
  const updateBookCacheWith = (addedBook) => {
    const allBooksData = client.readQuery({ query: ALL_BOOKS })
    const allAuthorsData = client.readQuery({ query: ALL_AUTHORS })
    console.log(addedBook.genres)
    

    if (!includedIn(allBooksData.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: allBooksData.allBooks.concat(addedBook)}
      })
    }
    if (!includedIn(allAuthorsData.allAuthors, addedBook.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: allAuthorsData.allAuthors.concat(addedBook.author)}
      })
    }
    addedBook.genres.forEach(genre => {
      console.log('genre', genre)
      try {
        const booksData = client.readQuery({ query: BOOKS, variables: { genre }})
        console.log(booksData)
      
        if (!includedIn(booksData.allBooks, addedBook)) {
          client.writeQuery({
            query: BOOKS,
            variables: { genre },
            data: { allBooks: booksData.allBooks.concat(addedBook)}
          })
        }
      } catch {
        console.log(':P')
      }
    })
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`a new book ${addedBook.title} added`)
      updateBookCacheWith(addedBook)
    }
  })
  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  const handleToken = (newToken) => {
    setToken(newToken)
    setPage('authors')
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && 
          <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={handleLogout}>logout</button>
          </>
        }
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />
      <Recommendation
        show={page === 'recommend'}
      />
      <LoginForm
        show={page === 'login'} setToken={handleToken}
      />
    </div>
  )
}

export default App