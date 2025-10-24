// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { tokens } = useContext(AuthContext);

  if (!tokens) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
