import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

/**
 * PrivateRoute — wraps pages that require authentication.
 * Redirects unauthenticated users to /login and remembers
 * where they were trying to go (redirects back after login).
 */
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
