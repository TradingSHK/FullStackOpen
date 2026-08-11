import { useAnecdotes } from '../hooks/useAnecdotes'

const AnecdoteList = () => {
  const {anecdotes, deleteAnecdote} = useAnecdotes()
  
  const handleDelete = (id) => {   
    deleteAnecdote(id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => (
          <li key={anecdote.id} >
            {anecdote.content}
            <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(anecdote.id)
            }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList
