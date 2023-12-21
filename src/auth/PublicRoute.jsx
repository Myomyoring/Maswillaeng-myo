import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/ProvideAuthContext';

export default function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  const user = currentUser();

  return user ? <Navigate to="/" /> : <>{children}</>;
}
