import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Check if the user is authenticated by looking for a "token" in localStorage
const isAuthenticated = () => {
  return localStorage.getItem('userAuthenticated') === 'true';
};

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login-home" />;
};

export default PrivateRoute;
