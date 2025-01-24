import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const baseurl = "http://localhost:3000/api/v1";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(formData);

  const handleSignup = async (formData) => {
    try {
      const response = await axios.post(`${baseurl}/signup `, formData, {
        withCredentials: true,
      });
      alert(response.data.message);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      alert(error.response?.data?.message || "error in signup");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            handleSignup(formData);
          }}
        >
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
            Sign Up
          </button>
        </form>
        <p className="text-gray-700 text-center p-2">
          {/*   */}
          Alread have an account?{" "}
          <Link className="text-blue-600" to="/Login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
