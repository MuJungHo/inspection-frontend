import AppRouter from './routers/AppRouter'
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";

const App = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <AppRouter />
      </GlobalProvider>
    </AuthProvider>
  );
};

export default App;
