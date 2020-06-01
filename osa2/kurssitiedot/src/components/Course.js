import React from 'react';

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>

} 
const Part = (props) => {
  console.log(props)
  return <p>{props.part} {props.exercises}</p>
}
const Content = ({ parts }) => {

  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}
const Total = ({ parts }) => {
  return <b>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</b>

}

const Course = ({ course }) => {
    console.log("Toimii")
return (  
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} /> 
  </div>
)
}

export default Course