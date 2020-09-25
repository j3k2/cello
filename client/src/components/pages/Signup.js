import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/User";
import authService from "../../services/auth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const userContext = useUserContext();

  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    document.title = "Create a Cello account";
  });

  async function signup() {
    if (!username.length || !password.length) {
      toast.error("Username and password are required");
      return;
    }
    try {
      await authService.signup({ username, password });

      const user = await authService.getAuthUser();

      if (user) {
        userContext.setUser(user);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.body);
    }
  }

  return (
    <main className="centered-column">
      <h1 className="page-title">Sign up</h1>
      <form
        className="centered-column"
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        <input
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Sign up" />
      </form>
      <Link to="/login">Already have an account? Log In</Link>
      <style jsx>
        {`
          input {
            margin: 8px;
          }
        `}
      </style>
    </main>
  );
};

export default Signup;
