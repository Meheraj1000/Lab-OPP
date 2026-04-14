import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './src/AuthProvider';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;  // Show loading spinner or text while checking
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length) {
    const currentRole = String(user?.role || '').toUpperCase();
    const normalizedAllowedRoles = allowedRoles.map((role) => String(role).toUpperCase());

    if (!normalizedAllowedRoles.includes(currentRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;  // If user exists, show the protected content
};



export default PrivateRoute;