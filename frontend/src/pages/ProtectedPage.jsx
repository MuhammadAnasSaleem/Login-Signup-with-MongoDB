import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/protected",
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(
          "Authentication failed:",
          error.response?.data?.message || error.message
        );
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show a loading state while checking authentication
  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  // Only render protected content if authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Protected Page Content</h1>
      <p>This is a protected route.</p>
    </div>
  );
}
