import { createContext, useContext } from 'react';
import AuthUser from '../auth/AuthUser';
import FirebaseAuthUser from '../auth/FirebaseAuthUser';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = AuthUser();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function FireAuthProvider({ children }) {
  const auth = FirebaseAuthUser();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
