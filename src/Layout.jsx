import React, { useEffect } from 'react';
import Header from './components/common/Header';
import { Outlet } from 'react-router-dom';
import { AuthContext } from './auth/ProvideAuthContext';

export default function App() {
  const token = localStorage.getItem('refresh_token');
  const { refresh } = AuthContext();

  useEffect(() => {
    if (!token && token !== 'undefined' && token !== null) refresh(token);
  }, [refresh, token]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
