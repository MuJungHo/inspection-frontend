import React from 'react';
import {
  Routes,
  Route,
  HashRouter,
  Navigate,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import routes from './routes';
import Login from "../Views/Login";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* Add a default route for authenticated users */}
        <Route 
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/user" replace /> 
            </PrivateRoute>
          }
        />
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PrivateRoute>
                {route.component && <route.component />}
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </HashRouter>
  );
};
export default AppRouter;