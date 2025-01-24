import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const baseurl = "http://localhost:3000/api/v1";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(`${baseurl}/login `, formData, {
        withCredentials: true,
      });
      alert(response.data.message);
      setFormData({ password: "", email: "" });
      const protectedRoute = async () => {
        try {
          const response = await axios.get(`${baseurl}/protected`, {
            withCredentials: true,
          });
          console.log("protected route data ", response.data);
          alert(response.data.message);
        } catch (error) {
          console.log("error in protected route");
          alert(
            error.response?.data?.message || "Error accessing protected route"
          );
        }
      };
      protectedRoute();
    } catch (error) {
      alert(error.response?.data?.message || "error in login");
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      // Send a request to the server to log out
      const response = await axios.post(
        `${baseurl}/logout`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
      const protectedRoute = async () => {
        try {
          const response = await axios.get(`${baseurl}/protected`, {
            withCredentials: true,
          });
          console.log("protected route data ", response.data);
          alert(response.data.message);
        } catch (error) {
          console.log("error in protected route");
          alert(
            error.response?.data?.message || "Error accessing protected route"
          );
        }
      };
      protectedRoute();
    } catch (error) {
      alert(error.response?.data?.message || "Error logging out");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            handleLogin(formData);
          }}
        >
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <button
          type="button"
          className="w-full py-3 mt-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition pt-3"
          onClick={logout}
        >
          Logout
        </button>
        <p className="text-gray-700 text-center p-2">
          {/* Alread have an account?  */}
          Not have an account?{" "}
          <Link className="text-blue-600" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
