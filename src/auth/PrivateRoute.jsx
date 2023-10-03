import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/ProvideAuthContext';

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const user = currentUser();

  return user ? <>{children}</> : <Navigate to="/logIn" />;
}
