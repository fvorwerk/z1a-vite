import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const { lang } = useParams(); // Get language parameter from URL

  // Show nothing while checking authentication status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to password page with language prefix
  if (!isAuthenticated) {
    // Store the attempted URL to redirect after login
    return <Navigate to={`/${lang}/dev-password`} state={{ from: location }} replace />;
  }

  // If authenticated, show the protected content
  return children;
};

export default ProtectedRoute;
