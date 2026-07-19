import { useIncGood, useIncNeutral, useIncBad } from '../store'

const Buttons = () => {
  const incGood = useIncGood()
  const incNeutral = useIncNeutral()
  const incBad = useIncBad()

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incGood}>good</button>
      <button onClick={incNeutral}>neutral</button>
      <button onClick={incBad}>bad</button>
    </div>
  )
}

export default Buttons
