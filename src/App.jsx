import React, { useEffect, useContext } from "react";
import AppRouter from './routers/AppRouter'
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import refreshTokenWorkerImport from './worker/refreshTokenWorker';

// 建立一個內部元件來處理 token 邏輯
const AppContent = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("keep") == 1) {
      const refreshTokenWorker = new Worker(refreshTokenWorkerImport);
      refreshTokenWorker.postMessage({ type: 'start', jwt: token });

      refreshTokenWorker.onmessage = (e) => {
        const { type } = e.data;

        if (type === 'refreshToken') {
          // 重新整理 Token
          renewToken()
            .then((token) => {
              refreshTokenWorker.postMessage({
                type: 'start', jwt:
                  token
              });

              console.log("refresh token success");
            });
        }
        else if (type === 'getToke') {
          console.log("get token");
          refreshTokenWorker.postMessage({ type: 'start', jwt: token });
        }
      };

      return () => {
        refreshTokenWorker.terminate();
      };
    }
  }, [token]); // 加入 token 作為相依項

  return (
    <GlobalProvider>
      <AppRouter />
    </GlobalProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
