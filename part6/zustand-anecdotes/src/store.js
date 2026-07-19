import { create } from 'zustand'
import anecdoteService from './services/anecdotes'
import { useNotificationStore } from './notificationStore'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote)}))
      useNotificationStore.getState().actions.setNotification(`Added anecdote: ${newAnecdote.content}`)
    },
    incVote: async(id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(
        id, {...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
      }))
      useNotificationStore.getState().actions.setNotification(`Voted for: ${updated.content}`)
    },
    setFilter: value => set(() => ({filter: value})),
    initialize: async() => {
      const anecdotes = await anecdoteService.getAll()
      const sortedAnecdotes = anecdotes.toSorted((a,b) => b.votes - a.votes)
      set(() => ({ anecdotes: sortedAnecdotes }))
    },
    deleteOne: async (id) => {
      await anecdoteService.deleteOne(id)
      set(state => ({ anecdotes: state.anecdotes.filter(a => a.id !== id)}))
    }
  },
}))

export default useAnecdoteStore

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if(filter !== '') return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  return anecdotes
}
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
