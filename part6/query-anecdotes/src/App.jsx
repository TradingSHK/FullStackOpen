import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const { anecdotes, isPending, incVotes } = useAnecdotes()
  
  const handleVote = (anecdote) => {
    incVotes(anecdote)
  }

  if (isPending) {
    return <div>loading data...</div>
  }

  if(anecdotes === undefined) {
    return (
      <div>
        anecdote service not available due to problems in server
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <AnecdoteForm />
      <Notification />

      {(anecdotes || []).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App