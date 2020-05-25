import React, { useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value} {props.postfix}</td>
  </tr>
)
const Statistics = (props) => {
  console.log(props.good+props.neutral+props.bad)
  let sum = props.good+props.neutral+props.bad
  let average = (props.good-props.bad)/sum
  if (sum===0){
    return <p>No feedback given.</p>
  }

  return (
    <table>
      <StatisticLine text="good" value={props.good} /> 
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={sum} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={props.good/sum*100} postfix="%"/>
    </table>
  )   
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback!</h1> 
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" /> 
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics:</h1>  
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
ReactDOM.render( <App />, document.getElementById('root'))
