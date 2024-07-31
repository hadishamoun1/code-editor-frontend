import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ requiredRole }) => {
  const token = sessionStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/unauthorized" />;
    }
    return <Outlet />;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
