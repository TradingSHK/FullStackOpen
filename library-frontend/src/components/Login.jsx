import { useState } from "react";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";
import { LOGINERROR } from "../const";

const Login = ({ show, setError, handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      handleLogin(token);
      setUsername("");
      setPassword("");
    },
    onError: (error) => {
      let errorMessage = LOGINERROR;
      if (error instanceof CombinedGraphQLErrors) {
        errorMessage = `Login failed: ${error.errors.map(e => e.message).join(', ')}`
      }
      setError(errorMessage);
    },
  });

  if (!show) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
