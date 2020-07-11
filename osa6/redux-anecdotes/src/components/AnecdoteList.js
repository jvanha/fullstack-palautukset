import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter==='') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  
  
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(upVote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 3))
  }
  
  return ( 
    <div>
      {anecdotes.sort((a1,a2) => a2.votes-a1.votes).map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList