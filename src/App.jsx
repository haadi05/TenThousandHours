import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./index.js";
import SkillContextProvider from "./context/SkillContextProvider.jsx";
//Firebase imports
import { AuthProvider } from "./context/AuthContext.jsx";
import "./firebase/db.js";
import { useAuth } from "./context/AuthContext.jsx";

function AppContent() {
  const location = useLocation();
  const { loading, userLoggedIn } = useAuth();
  const hideNavbar = ["/login", "/signup", "/"].includes(location.pathname);

  const shouldShowNavbar = !loading && !hideNavbar && userLoggedIn;

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && userLoggedIn && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [loading, userLoggedIn, location.pathname]);

  return (
    <SkillContextProvider>
      {shouldShowNavbar && <Navbar />}
      <Outlet />
    </SkillContextProvider>
  );
}

// Main App component that wraps everything with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
