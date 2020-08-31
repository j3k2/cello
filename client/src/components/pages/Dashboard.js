import React from 'react';
import { useUserContext } from '../../contexts/User';
import BoardsList from '../boards/BoardsList';

const Dashboard = () => {
  const userContext = useUserContext();

  return (
      <BoardsList />
  )
}

export default Dashboard;