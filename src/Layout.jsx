import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from './context/ProvideAuthContext';
import Header from './components/common/Header';

export default function App() {
  const { checker } = useAuth();
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
