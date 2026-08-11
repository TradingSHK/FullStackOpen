import { create } from "zustand";

export const useSuccessNotificationStore = create((set, get) => ({
    successMessage: '',
    timeoutId: null,
    actions: {
        setSuccessMessage: (successMessage, timeout = 5000) => {
            const { timeoutId } = get()

            if(timeoutId) {
                clearTimeout(timeoutId)
            }

            const newTimeoutId = setTimeout(() => {
                set({successMessage: '', timeoutId: null})
            }, timeout)

            set({ successMessage, timeoutId: newTimeoutId })
        },
    }
})) 


export const useErrorNotificationStore = create((set, get) => ({
    errorMessage: '',
    timeoutId: null,
    actions: {
        setErrorMessage: (errorMessage, timeout = 5000) => {
            const { timeoutId } = get()

            if(timeoutId) {
                clearTimeout(timeoutId)
            }

            const newTimeoutId = setTimeout(() => {
                set({errorMessage: '', timeoutId: null})
            }, timeout)

            set({ errorMessage, timeoutId: newTimeoutId })
        },
    }
}))

export const useSuccessNotification = () => useSuccessNotificationStore(state => state.successMessage)
export const useErrorNotification = () => useErrorNotificationStore(state => state.errorMessage)
export const useSuccessNotificationActions = () => useSuccessNotificationStore(state => state.actions)
export const useErrorNotificationActions = () => useErrorNotificationStore(state => state.actions)