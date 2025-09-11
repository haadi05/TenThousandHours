import { Outlet } from "react-router-dom";
import { Navbar } from "./index.js";
import SkillContextProvider from "./context/SkillContextProvider.jsx";

function App() {
  return (
    <SkillContextProvider>
      <Navbar />
      <Outlet />
    </SkillContextProvider>
  );
}

export default App;
