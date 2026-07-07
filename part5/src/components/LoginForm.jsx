import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br/><br/>
        <TextField
        label="username"
        value={username}
        onChange={handleUsernameChange}
        />
        <br/><br/>
        <TextField
        label="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        />
        <br/><br/>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>login</Button>
      </form>
    </div>
  )
}

export default LoginForm