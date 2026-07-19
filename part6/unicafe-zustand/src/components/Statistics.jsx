import { useGood, useNeutral, useBad } from '../store'

const Statistics = () => {
  const good = useGood()
  const neutral = useNeutral()
  const bad = useBad()
  const all = good + neutral + bad
  const average = all > 0 ? (good - bad) / all : 0
  const positive = all > 0 ? (good / all) * 100 : 0

  return (
    <div>
      <h2>statistics</h2>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <tr><td>good</td><td>{good}</td></tr>
            <tr><td>neutral</td><td>{neutral}</td></tr>
            <tr><td>bad</td><td>{bad}</td></tr>
            <tr><td>all</td><td>{all}</td></tr>
            <tr><td>average</td><td>{average.toFixed(2)}</td></tr>
            <tr><td>positive</td><td>{positive.toFixed(1)}%</td></tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Statistics
