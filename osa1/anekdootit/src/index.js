import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.clickHandler}>{props.text}</button>
)
const Anecdote = (props) => (
  <div>
    <p>{props.text}</p>
    <p>has {props.votes} votes</p>
  </div>
)
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(props.anecdotes.length))
  console.log(votes)
  
  const handelNext = () => {
    let random = Math.floor(Math.random()*props.anecdotes.length)
    while (random===selected) {
      random = Math.floor(Math.random()*props.anecdotes.length)
    }
    setSelected(random)
  }

  const handleVote = () => {
    const votesCopy = [...votes] 
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }
  return (
    <div>
      <h1>Anecdote of the day:</h1>
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected]}/>
      <Button clickHandler={handelNext} text="Next anecdote" /> 
      <Button clickHandler={handleVote} text="Vote" />
      <h1>And the winner is...</h1>
      <Anecdote text={props.anecdotes[votes.indexOf(Math.max(...votes))]} votes={Math.max(...votes)}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'))

