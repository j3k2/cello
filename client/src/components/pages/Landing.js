import React from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import { useUserContext } from "../../contexts/User";
import authService from "../../services/auth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function Landing() {
  React.useEffect(() => {
    document.title = "Cello";
  });

  const userContext = useUserContext();

  const history = useHistory();

  async function login() {
    try {
      await authService.login({ username: "test", password: "test" });

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
    <React.Fragment>
      <Header
        right={() => {
          return (
            <React.Fragment>
              <Link className="button" to="/login">
                Log in
              </Link>
              <Link className="button" to="/signup">
                Sign Up
              </Link>
            </React.Fragment>
          );
        }}
      />
      <main className="centered-column">
        <div className="">
          Cello is a full-stack Trello clone built with Postgres, NodeJS, and React.
          Sign up/log in with your own account, or click this button to see a demo without signing up:
          <br/>
          <button className="submit" onClick={login}>
            Log in as demo user
          </button>
        </div>
      </main>
    </React.Fragment>
  );
}
