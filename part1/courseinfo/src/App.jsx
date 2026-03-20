const Header = props => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = part => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  )
}

const Content = ( { parts } ) => {  
  return(
    <div>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises}/>
      ))}
    </div>
  )
}

const Total = ({parts}) => {
  let totalNoOfExercises = 0
  parts.forEach(part => totalNoOfExercises += part.exercises)
  return (
    <div>
      <p>
        The total number of exercises: {totalNoOfExercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App