import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const isAuthenticated = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, []);

  return children;
}

export default ProtectedRoutes;
