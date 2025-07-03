import React, { useEffect, useContext } from "react";
import AppRouter from './routers/AppRouter'
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import refreshTokenWorkerImport from './worker/refreshTokenWorker';

const App = () => {

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
  }, []);

  return (
    <AuthProvider >
      <GlobalProvider>
        <AppRouter />
      </GlobalProvider>
    </AuthProvider>
  )
};

export default App
