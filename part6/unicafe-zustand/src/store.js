import { create } from 'zustand'

export const useStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  incGood: () => set(state => ({ good: state.good + 1 })),
  incNeutral: () => set(state => ({ neutral: state.neutral + 1 })),
  incBad: () => set(state => ({ bad: state.bad + 1 })),
  reset: () => set({ good: 0, neutral: 0, bad: 0 })
}))

// convenience hooks (call inside components)
export const useGood = () => useStore(state => state.good)
export const useNeutral = () => useStore(state => state.neutral)
export const useBad = () => useStore(state => state.bad)
export const useIncGood = () => useStore(state => state.incGood)
export const useIncNeutral = () => useStore(state => state.incNeutral)
export const useIncBad = () => useStore(state => state.incBad)
