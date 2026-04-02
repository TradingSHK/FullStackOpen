const Total = (props) => {
    const sumOfExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0,)
    return <b>total of {sumOfExercises} exercises</b>
}

export default Total