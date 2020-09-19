import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { useUserContext } from "./contexts/User";

import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Landing from "./components/pages/Landing";
import Header from "./components/common/Header";

import BoardView from "./components/pages/BoardView";

import Spinner from "react-spinkit";
import authService from "./services/auth";
import "typeface-pacifico";

function AuthenticatedApp() {
  const userContext = useUserContext();

  return (
    <Router>
      <Header>
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          Cello
          <style jsx>
            {`
              span {
                font-family: "Pacifico";
                font-size: 20px;
                padding-top: 2px;
              }
            `}
          </style>
        </span>
        <div>
          <span>{`Logged in as: ${userContext.user.username}`}</span>
          <Link
            onClick={() => {
              authService.logout();
              userContext.setUser(null);
            }}
          >
            Logout
          </Link>
        </div>
      </Header>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/board/:id">
          <BoardView />
        </Route>
        <Route path="*">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Router>
  );
}

function UnauthenticatedApp() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Landing} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  const userContext = useUserContext();
  const user = userContext.user;
  const userPending = userContext.userPending;

  return (
    <React.Fragment>
      {userPending && (
        <Spinner className="page-loading-spinner" name="circle" />
      )}
      {!userPending && user && <AuthenticatedApp />}
      {!userPending && !user && <UnauthenticatedApp />}
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
