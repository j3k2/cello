import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/User';
import authService from '../../services/auth';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const userContext = useUserContext();

  const history = useHistory();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(()=>{
    document.title = 'Log in to Cello';
  });
  
  async function login() {
    if(!username.length || !password.length) {
      toast.error('Username and password are required');
      return;
    }
    try {
      await authService.login({ username, password });

      const user = await authService.getAuthUser();

      if (user) {
        userContext.setUser(user);
        history.push('/dashboard');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.body);
    }
  }

  return (
    <main className="centered-column">
      <h1 className="page-title">Log in</h1>
      <form
        className="centered-column"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}>
        <input
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)} />
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Log in" />
      </form>
      <Link to="/signup">Sign up for an account</Link>
    </main>
  )
}

export default Login;