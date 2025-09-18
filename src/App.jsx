import { Outlet, useLocation } from "react-router-dom";
import { Navbar, ProtectedRoutes } from "./index.js";
import SkillContextProvider from "./context/SkillContextProvider.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <AuthProvider>
      <SkillContextProvider>
        <ProtectedRoutes>{!hideNavbar && <Navbar />}</ProtectedRoutes>
        <Outlet />
      </SkillContextProvider>
    </AuthProvider>
  );
}

export default App;
