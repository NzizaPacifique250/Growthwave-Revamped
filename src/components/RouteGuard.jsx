import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Wrap any route element that requires the student to be signed in. Falls
// back to the Path Discovery page since there is no dedicated login screen
// yet — the Enrollment Wizard surface (later step) will provide signup.
export default function RouteGuard({ children, redirectTo = '/academy/paths' }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }
  return children;
}
