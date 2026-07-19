import { create } from 'zustand'

export const useNotificationStore = create((set, get) => ({
  message: '',
  timeoutId: null,
  actions: {
    setNotification: (message, timeout = 5000) => {
      const { timeoutId } = get()

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const newTimeoutId = setTimeout(() => {
        set({ message: '', timeoutId: null })
      }, timeout)

      set({ message, timeoutId: newTimeoutId })
    },
    clearNotification: () => {
      const { timeoutId } = get()

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      set({ message: '', timeoutId: null })
    }
  }
}))

export const useNotification = () => useNotificationStore(state => state.message)
export const useNotificationActions = () => useNotificationStore(state => state.actions)
