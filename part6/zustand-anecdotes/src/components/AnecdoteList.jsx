import { useAnecdotes } from "../store";
import Anecdote from '../components/Anecdote'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()

    return (
        <ul>
            {anecdotes.map(anecdote => (
                <Anecdote key={anecdote.id} anecdote={anecdote}/>
            ))}
        </ul>
    )
}

export default AnecdoteList