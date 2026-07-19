import { useAnecdoteActions } from "../store"

const Anecdote = ({ anecdote }) => {
    const { incVote, deleteOne } = useAnecdoteActions()
    
    return (
        <li>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes} votes
                <button onClick={() => incVote(anecdote.id)}>vote</button>
                <button onClick={() => deleteOne(anecdote.id)}>remove</button>
            </div>
        </li>

    )
}

export default Anecdote