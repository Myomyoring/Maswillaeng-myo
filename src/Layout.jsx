// import React from 'react';
import Header from './components/common/Header';
import { Outlet } from 'react-router-dom';
import { AuthContext } from './auth/ProvideAuthContext';

export default function App() {
  const token = localStorage.getItem('refresh_token');
  const { refresh, logoutTimer } = AuthContext();
  // 리렌더링 시에만 작동
  if (token !== undefined && token !== 'undefined' && token !== null) {
    refresh(token);
    logoutTimer();
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
