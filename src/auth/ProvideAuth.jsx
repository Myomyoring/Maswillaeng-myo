import { createContext, useContext, useState } from 'react';

const EXPIRE_TIME = 1000 * 60 * 60;
const authContext = createContext();

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const getUserToken = (token) => {
    if (!token) return false;
  };

  const signIn = async (callback) => {
    const { token } = localStorage.getItem('accessToken');
    const user = await getUserToken(token);
    if (!user) return;

    setUser(user);
    callback?.();
  };

  const signOut = (callback) => {
    localStorage.clear();
    setUser(null);
    callback?.();
  };

  return { user, signIn, signOut };
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

export { ProvideAuth, useAuth };
