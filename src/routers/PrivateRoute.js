import React, { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Layout from '../components/layout/Layout';

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Layout>
      {children}
    </Layout>
  );
}

export default PrivateRoute;