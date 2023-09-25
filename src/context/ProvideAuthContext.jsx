import { createContext, useContext } from 'react';
import AuthUser from '../auth/AuthUser';

const authContext = createContext();

function AuthProvider({ children }) {
  const auth = AuthUser();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

export { AuthProvider, useAuth };
