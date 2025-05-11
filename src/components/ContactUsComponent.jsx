import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactUsComponent = () => {
  const [formData, setFormData] = useState({
    username: "",
    query: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send form data to a server)
    console.log("Form Submitted", formData);
  };

  return (
    <div className="space-y-8">
      {/* Title Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>
        <p className="text-gray-600">We would love to hear from you!</p>
      </motion.div>

      {/* Form with Animation */}
      <motion.form
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="mt-2 px-4 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label htmlFor="query" className="block text-gray-700">Query</label>
          <textarea
            name="query"
            value={formData.query}
            onChange={handleInputChange}
            required
            rows="4"
            className="mt-2 px-4 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="mt-2 px-4 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
        >
          Submit
        </button>
      </motion.form>

     
    </div>
  );
};

export default ContactUsComponent;
