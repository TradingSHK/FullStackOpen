import { useState } from 'react'

const StatisticLine = ({ text, value, type }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{type}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  return (
    <table>
      <tbody>
          <StatisticLine text="good" value= {good} />
          <StatisticLine text="neutral" value= {neutral} />
          <StatisticLine text="bad" value= {bad} />
          <StatisticLine text="all" value= {good+neutral+bad} />
          <StatisticLine text="average" value= {(good + (-1)* bad)/(good+bad+neutral)} />
          <StatisticLine text="positive" value= {(good/(good+bad+neutral))*100} type="%" />
        </tbody>
    </table>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const createOutput = () => {
    if (good === 0 && neutral === 0 && bad === 0) {
      return "No feedback given"
    }
    else {
      return (
          <div>
            <Statistics good={good} bad={bad} neutral={neutral} />
          </div>
      )
    }
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      {createOutput()}
    </div>
  )
}

export default App