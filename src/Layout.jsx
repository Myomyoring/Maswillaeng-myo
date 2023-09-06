// import React from 'react';
import Header from './components/common/Header';
import { Outlet } from 'react-router-dom';
import { AuthContext } from './auth/ProvideAuthContext';
import { useEffect } from 'react';

export default function App() {
  const { checker } = AuthContext();
  useEffect(() => {
    checker();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
