import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { instance } from "../utils/apis";

const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [keep, setKeep] = useState(localStorage.getItem('keep') === "1");
  const [userPermissions, setUserPermissions] = useState({ routes: [], actions: {} });

  // 初始化時處理已存在的 token
  useEffect(() => {
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const permissions = parseTokenPermissions(token);
      setUserPermissions(permissions);
    }
  }, []);

  const parseTokenPermissions = (jwtToken) => {
    try {
      const decoded = jwtDecode(jwtToken);
      const roles = decoded.role || [];
      
      const routes = [];
      const actions = {};
      
      roles.forEach(roleStr => {
        const [authName, scope] = roleStr.split('_');
        if (authName && scope) {
          const lowerAuthName = authName.toLowerCase();
          
          // 加入 routes
          if (!routes.includes(lowerAuthName)) {
            routes.push(lowerAuthName);
          }
          
          // 加入 actions
          if (!actions[lowerAuthName]) {
            actions[lowerAuthName] = [];
          }
          if (!actions[lowerAuthName].includes(scope.toLowerCase())) {
            actions[lowerAuthName].push(scope.toLowerCase());
          }
        }
      });
      
      return { routes, actions };
    } catch (error) {
      console.error('解析 token 權限失敗:', error);
      return { routes: [], actions: {} };
    }
  };

  const login = async (jwtToken) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

    setToken(jwtToken);
    
    const permissions = parseTokenPermissions(jwtToken);
    setUserPermissions(permissions);

    localStorage.setItem('keep', keep ? 1 : 0);

    if (keep) {
      localStorage.setItem('token', jwtToken);
    }
  };

  const logout = () => {

    delete instance.defaults.headers.common["Authorization"];

    setToken(null);
    setUserPermissions({ routes: [], actions: {} });

    localStorage.clear()
  };

  const canAccessRoute = (authName) => {
    const { routes } = userPermissions;
    const hasAdmin = routes.includes('admin');
    const hasSysAdmin = routes.includes('sysadmin');

    // 若 authName 為 null 或空字串，僅 admin 或 sysadmin 可瀏覽
    if (!authName || authName.trim() === '') {
      return hasAdmin || hasSysAdmin;
    }

    const lowerAuthName = authName.toLowerCase();

    if (lowerAuthName === 'admin') {
      return hasAdmin || hasSysAdmin;
    }

    if (lowerAuthName === 'sysadmin') {
      return hasSysAdmin;
    }

    // 一般權限檢查
    return routes.includes(lowerAuthName) || hasAdmin || hasSysAdmin;
  };

  const canAccessAction = (roleName, action) => {
    const lowerRoleName = roleName.toLowerCase();
    const lowerAction = action.toLowerCase();
    const { actions } = userPermissions;
    
    // 檢查是否有 sysAdmin 權限
    if (actions['sysadmin']) {
      const sysAdminScopes = actions['sysadmin'];
      if (sysAdminScopes.includes('all') || sysAdminScopes.includes(lowerAction)) {
        return true;
      }
    }
    
    // 檢查是否有 admin 權限（但不包含 sysAdmin 相關操作）
    if (lowerRoleName !== 'sysadmin' && actions['admin']) {
      const adminScopes = actions['admin'];
      if (adminScopes.includes('all') || adminScopes.includes(lowerAction)) {
        return true;
      }
    }
    
    // 檢查 admin 權限請求
    if (lowerRoleName === 'admin') {
      if (actions['admin']) {
        const adminScopes = actions['admin'];
        if (adminScopes.includes('all') || adminScopes.includes(lowerAction)) {
          return true;
        }
      }
      // admin 權限也可以用 sysAdmin 存取
      if (actions['sysadmin']) {
        const sysAdminScopes = actions['sysadmin'];
        if (sysAdminScopes.includes('all') || sysAdminScopes.includes(lowerAction)) {
          return true;
        }
      }
      return false;
    }
    
    // 檢查 sysAdmin 權限請求
    if (lowerRoleName === 'sysadmin') {
      if (actions['sysadmin']) {
        const sysAdminScopes = actions['sysadmin'];
        return sysAdminScopes.includes('all') || sysAdminScopes.includes(lowerAction);
      }
      return false;
    }
    
    // 檢查特定角色權限
    if (actions[lowerRoleName]) {
      const roleScopes = actions[lowerRoleName];
      return roleScopes.includes('all') || roleScopes.includes(lowerAction);
    }
    
    return false;
  };

  const value = {
    token,
    login,
    logout,
    keep,
    setKeep,
    canAccessRoute,
    canAccessAction,
    userPermissions
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };