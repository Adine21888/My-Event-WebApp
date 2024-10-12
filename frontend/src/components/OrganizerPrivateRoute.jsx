import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { OrganizerAuthContext } from '../../contexts/OrganizerAuthContext';

const OrganizerPrivateRoute = ({ children }) => {
  const { token } = useContext(OrganizerAuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default OrganizerPrivateRoute;
