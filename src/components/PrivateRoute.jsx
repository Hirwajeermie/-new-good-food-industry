import React from 'react';
import { Navigate } from 'react-router-dom';
import { getdata } from '../../public/functions';

// Check if the user is authenticated by looking for a "token" in localStorage
const isAuthenticated = () => {
  return getdata('token');
};

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login-home" />;
};

export default PrivateRoute;
