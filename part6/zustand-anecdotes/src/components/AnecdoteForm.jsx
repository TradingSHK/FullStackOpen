import { useAnecdotes, useAnecdoteActions } from "../store";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const anecdotes = useAnecdotes()
    const { add } = useAnecdoteActions()
    
    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        console.log(content);
        await add(content)
        e.target.reset()
    }

    return (
        <div>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )

}

export default AnecdoteForm