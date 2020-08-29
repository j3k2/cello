import React from 'react';
import { useUserContext } from '../../contexts/User';
import BoardsList from '../boards/BoardsList';

const Dashboard = () => {
  const userContext = useUserContext();

  return (
    <main className="centered-column">
      Welcome, {userContext.user.username}!
      <BoardsList />
    </main>
  )
}

export default Dashboard;