import { Alert } from '@mui/material'
import { useSuccessNotification, useErrorNotification } from '../notificationStore'

const Notification = () => {
  const successMessage = useSuccessNotification()
  const errorMessage = useErrorNotification()
  
  if (successMessage === null && errorMessage === null ) {
    return null
  }

  if(successMessage) {
    return (
      <Alert style={{ marginTop: 10, marginBottom: 10 }} severity="success">
        {successMessage}
      </Alert>
    )
  }

  if(errorMessage) {
    return (
      <Alert style={{ marginTop: 10, marginBottom: 10 }} severity="error">
        {errorMessage}
      </Alert>
    )
  }
}

export default Notification
