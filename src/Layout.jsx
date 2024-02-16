import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { authService } from './firebase-config';

import { useAuth } from './contexts/ProvideAuthContext';
import Header from './components/header/Header';
import LoadingScreen from './components/common/LoadingScreen';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const { logoutTimer } = useAuth();

  const init = async () => {
    await authService.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
    logoutTimer();
  }, []);
  return (
    <>
      <Header />
      {isLoading ? <LoadingScreen /> : <Outlet />}
    </>
  );
}
