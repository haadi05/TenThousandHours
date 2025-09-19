import "./firebase/db.js";

import { AuthProvider } from "./context/AuthContext.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./index.js";
import SkillContextProvider from "./context/SkillContextProvider.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function AppContent() {
  const location = useLocation();
  const { loading, userLoggedIn } = useAuth();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  const shouldShowNavbar = !loading && !hideNavbar && userLoggedIn;

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
