import React from "react";
import { Navigate } from "react-router-dom";

// Helper function to get a specific cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export default function ProtectedRouteChecker({ children }) {
  const token = getCookie("myToken"); // Fetch the token by its key name
  const isAuthenticated = !!token; // Convert token presence to boolean

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
