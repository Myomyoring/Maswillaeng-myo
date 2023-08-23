// import React from 'react';
import Header from './components/common/Header';
import { Outlet } from 'react-router-dom';
import { AuthContext } from './auth/ProvideAuthContext';

export default function App() {
  const { checker } = AuthContext();
  checker();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
