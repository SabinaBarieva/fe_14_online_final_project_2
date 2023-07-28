import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function RequireAuth({ children }) {
  const location = useLocation();
  const auth = useSelector((state) => state.user.user);

  if (!auth && auth === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default RequireAuth;
