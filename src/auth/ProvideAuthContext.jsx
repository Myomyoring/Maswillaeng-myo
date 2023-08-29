import { createContext, useContext } from 'react';
import useAuth from './useAuth';

const authContext = createContext();

function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function AuthContext() {
  return useContext(authContext);
}

export { AuthProvider, AuthContext };
