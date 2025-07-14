import React, { createContext, useState } from "react";
import { instance } from "../utils/apis";
import { accountAccessPages, accountAccessActions } from "../utils/constant";
const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [keep, setKeep] = useState(localStorage.getItem('keep') === "1");

  const login = async (jwtToken) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

    setToken(jwtToken);

    localStorage.setItem('keep', keep ? 1 : 0);

    if (keep) {
      localStorage.setItem('token', jwtToken);
    }
  };

  const logout = () => {

    delete instance.defaults.headers.common["Authorization"];

    setToken(null);

    localStorage.clear()
  };

  const canAccessPage = (roleName) => accountAccessPages.includes(roleName);

  const canAccessAction = (roleName, action) => accountAccessActions[roleName]?.includes(action) || false;

  const value = {
    token,
    login,
    logout,
    keep,
    setKeep,
    canAccessPage,
    canAccessAction
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };