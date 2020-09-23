import React from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";

export default function Landing() {
  React.useEffect(() => {
    document.title = "Cello";
  });

  return (
    <React.Fragment>
      <Header
        right={() => {
          return (
            <React.Fragment>
              <Link className="light" to="/login">
                Log in
              </Link>
              <Link className="light" to="/signup">
                Sign Up
              </Link>
            </React.Fragment>
          );
        }}
      />
      <main className="centered-column">Welcome! Login or sign up!</main>
    </React.Fragment>
  );
}
