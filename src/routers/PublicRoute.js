import React, { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function PublicRoute({ children }) {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (token) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
}

export default PublicRoute;