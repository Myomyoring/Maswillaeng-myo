import { Navigate } from 'react-router-dom';
import { authService } from '../firebase-config';
import { useAuth } from '../context/ProvideAuthContext';

export default function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  const user = currentUser();
  // const user = authService.currentUser;

  return user ? <Navigate to="/" /> : <>{children}</>;
}
