import { createContext, useContext, useEffect, useRef, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState('')
  const timeoutId = useRef(null)

  const clearNotification = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    setNotification('')
    timeoutId.current = null
  }

  const notify = (message, timeout = 5000) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    setNotification(message)

    timeoutId.current = setTimeout(() => {
      setNotification('')
      timeoutId.current = null
    }, timeout)
  }

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [])

  return (
    <NotificationContext.Provider value={{ notification, notify, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

// export const useNotify = () => {
//   const context = useContext(NotificationContext)

//   if (!context) {
//     throw new Error('useNotify must be used within a NotificationContextProvider')
//   }

//   return context
// }
