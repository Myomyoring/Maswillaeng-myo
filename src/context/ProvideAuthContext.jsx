import { createContext, useContext } from 'react';
import FirebaseAuthUser from '../auth/FirebaseAuthUser';

const authContext = createContext();

export function FireAuthProvider({ children }) {
  const auth = FirebaseAuthUser();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
