import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // ← Add useNavigate

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ← Initialize navigate

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const response = await fetch("http://localhost:5000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert("Login successful!");
  //       navigate("/dashboard"); // ← Redirect to Dashboard
  //     } else {
  //       setError(data.message || "Login failed");
  //     }
  //   } catch (err) {
  //     setError("Something went wrong. Try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  // Simulate successful login
  setTimeout(() => {
    alert("Login successful!");
    navigate("/dashboard");
    setLoading(false);
  }, 1000);
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#d84357] via-[#c63679] to-[#9b2e91]">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-[#d84357] to-[#9b2e91] text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
        <p className="text-sm text-center mt-4 text-blue-600 hover:underline cursor-pointer">
          <Link to="/signup">Don't have an account? Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginComponent;
