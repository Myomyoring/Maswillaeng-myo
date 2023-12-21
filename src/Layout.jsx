import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { authService } from './firebase-config';

import Header from './components/common/Header';
import LoadingScreen from './components/common/LoadingScreen';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await authService.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Header />
      {isLoading ? <LoadingScreen /> : <Outlet />}
    </>
  );
}
