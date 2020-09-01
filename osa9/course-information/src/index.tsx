import React from 'react';
import ReactDOM from 'react-dom';
/*
interface CoursePart {
  name: string;
  exerciseCount: number;
}
*/
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface DescriptedCoursePart extends CoursePartBase {
  description: string;
}
interface CoursePartOne extends DescriptedCoursePart {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends DescriptedCoursePart {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends DescriptedCoursePart {
  name: "React with types";
}
type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "React with types",
    exerciseCount: 20,
    description: "Putting it all together"
  }
];

const assertNever = (value: never): never => {
  throw new Error(
    `${JSON.stringify(value)} should not reach here`
  )
}
const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <h4>{part.name}</h4> 
          <p>Number of exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
        </div>
      )
    case "Using props to pass data":
      return (
        <div>
          <h4>{part.name}</h4> 
          <p>Number of exercises: {part.exerciseCount}</p>
          <p>Group projected count: {part.groupProjectCount}</p>
        </div>
      )
    case "Deeper type usage":
      return (
        <div>
          <h4>{part.name}</h4> 
          <p>Number of exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p>Submisiion link: {part.exerciseSubmissionLink}</p>
        </div>
      )
    case "React with types":
      return (
        <div>
          <h4>{part.name}</h4> 
          <p>Number of exercises: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
        </div>
      )
    default:
      return assertNever(part)
  }
}
const Header: React.FC<{ text: string }> = ({ text }) => (
  <div><h1>{text} </h1></div>
)

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
  <div>
    <Part part={courseParts[0]} />
    <Part part={courseParts[1]} />
    <Part part={courseParts[2]} />
    <Part part={courseParts[3]} />
  </div>
)

const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
  <div>
    <p>
      Total number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </div>
)

const App: React.FC = () => {
  const courseName = 'Half Stack application development'
  /*const courseParts = [
    {
      name: 'fundamentals',
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
 
  ]*/
  
  return (
    <div>
      <Header text={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
};


ReactDOM.render(<App />,document.getElementById('root'));

