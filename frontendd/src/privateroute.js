// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element, authenticated, redirectTo }) {
  return authenticated ? (
    element
  ) : (
    <Navigate to={redirectTo} replace />
  );
}

export default PrivateRoute;
