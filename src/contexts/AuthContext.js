import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { instance } from "../utils/apis";

const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJEZW1vIEluc3BlY3RvciIsInJvbGUiOiJpbnNwZWN0b3IiLCJpYXQiOjE3Nzc4NTk2MTMsImV4cCI6MTc3Nzk0NjAxM30.Klz2wCarXpTxFNaQUBICOMJRvU8OnsN2qL1u4W7U52A');
  const [keep, setKeep] = useState(localStorage.getItem('keep') === "1");

  // 初始化時處理已存在的 token
  useEffect(() => {
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

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

  const value = {
    token,
    login,
    logout,
    keep,
    setKeep,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };