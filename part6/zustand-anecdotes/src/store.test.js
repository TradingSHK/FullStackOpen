import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
        deleteOne: vi.fn(),
    }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, {useAnecdotes, useFilter, useAnecdoteActions } from './store'

beforeEach(() => {
    useAnecdoteStore.setState({anecdotes: [], filter: '' })
    vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
    it('initialize loads anecdotes from service', async () => {
        const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdoteResult } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toEqual(mockAnecdotes)
    })

    it('getAll returns sorted by votes', async () => {
        const mockAnecdotes = [
            { id: 1, content: 'Test', votes: 0 }, 
            { id: 2, content: 'Test 2', votes: 1 }
        ]

        const sortedMockAnecdotes = [{id: 2, content: 'Test 2', votes: 1}, { id: 1, content: 'Test', votes: 0 }]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdoteResult } = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toEqual(sortedMockAnecdotes)
    })

    it('filter works', async () => {
        const mockAnecdotes = [
            { id: 1, content: 'A', votes: 0 }, 
            { id: 2, content: 'B', votes: 1 }
        ]

        useAnecdoteStore.setState({anecdotes: mockAnecdotes, filter: 'A'})
        const {result} = renderHook(() => useAnecdotes())
        expect(result.current).toEqual([mockAnecdotes[0]])
    })

    it('votes actually increase', async () => {
        const mockAnecdotes = { id: 1, content: 'Test', votes: 0 }
        useAnecdoteStore.setState({anecdotes: [mockAnecdotes]})
        anecdoteService.update.mockResolvedValue({...mockAnecdotes, votes: 1})

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.incVote(1)
        })

        const { result: anecdoteResult } = renderHook(() => useAnecdotes())

        expect(anecdoteResult.current[0].votes).toEqual(1)
    })
})