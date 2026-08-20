import { TextField, Button } from '@mui/material'
import { useUser, useUserActions } from '../userStore'
import { useNavigate } from "react-router";
import { useSuccessNotificationActions, useErrorNotificationActions } from '../notificationStore'; 


const LoginForm = () => {
  const { login, setUsername, setPassword } = useUserActions()
  const navigate = useNavigate() 
  const { setSuccessMessage } = useSuccessNotificationActions()
  const { setErrorMessage } = useErrorNotificationActions()

  const logon = async (e) => {
    e.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    setUsername(username)
    setPassword(password)
    try {
      const loggedUser = await login()
      setSuccessMessage(`Welcome ${loggedUser.name}!`)
    } 
    catch (exception) {
      console.log(exception);
      
      setErrorMessage('wrong username or password')
    }
    
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={logon}>
        <br/><br/>
        <TextField
        label="username"
        id="username"
        />
        <br/><br/>
        <TextField
        label="password"
        type="password"
        id="password"
        />
        <br/><br/>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>login</Button>
      </form>
    </div>
  )
}

export default LoginForm