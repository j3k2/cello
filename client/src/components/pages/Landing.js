import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header/Header';

export default function Landing() {
  React.useEffect(() => {
    document.title = 'Cello';
  });

  return (<React.Fragment>
    <Header>
      <div>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </Header>
    <main className="centered-column">
      Welcome! Login or sign up!
    </main>
  </React.Fragment>)
}