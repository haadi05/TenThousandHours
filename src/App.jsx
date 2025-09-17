import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./index.js";
import SkillContextProvider from "./context/SkillContextProvider.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <AuthProvider>
      <SkillContextProvider>
        {!hideNavbar && <Navbar />}
        <Outlet />
      </SkillContextProvider>
    </AuthProvider>
  );
}

export default App;
