import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../../requests'
import useNotification from './useNotification'

export const useAnecdotes = () => {
    const queryClient = useQueryClient()
    const {notify} = useNotification()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false,
        retry: 1
    })

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        },
        onError: () => {
            notify('The anecdote must be at least 5 characters long')
        }
    })

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            notify(`anecdote '${updatedAnecdote.content}' voted`)
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
        incVotes: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }
}