import { createContext, useContext } from 'react';
import AuthUser from '../auth/AuthUser';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = AuthUser();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
