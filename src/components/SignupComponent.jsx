import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SignupComponent = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    prn: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    course: "",
    center: "",
  });
  const [errors, setErrors] = useState({});

  const validateStepOne = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    return newErrors;
  };

  const validateStepTwo = () => {
    const newErrors = {};
    if (!formData.prn.trim()) newErrors.prn = "PRN is required.";
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Valid 10-digit mobile number is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.course.trim()) newErrors.course = "Course is required.";
    if (!formData.center.trim()) newErrors.center = "Center is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validateStepOne();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setStep(2);
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const validationErrors = validateStepTwo();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const isDuplicate = existingUsers.some(
        (user) => user.username === formData.username
      );
      if (isDuplicate) {
        alert("Username already exists. Please choose a different one.");
      } else {
        const updatedUsers = [...existingUsers, formData];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert("Account created successfully!");
        setStep(1);
        setFormData({
          username: "",
          password: "",
          prn: "",
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          gender: "",
          course: "",
          center: "",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-purple-700">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        {step === 1 ? (
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700">Choose Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">Create Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreateAccount} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">PRN</label>
                <input
                  name="prn"
                  type="text"
                  value={formData.prn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                />
                {errors.prn && <p className="text-red-500 text-sm">{errors.prn}</p>}
              </div>
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  name="mobile"
                  type="text"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Course</label>
                <input
                  name="course"
                  type="text"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                />
                {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Center</label>
                <input
                  name="center"
                  type="text"
                  value={formData.center}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                />
                {errors.center && <p className="text-red-500 text-sm">{errors.center}</p>}
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 mr-2 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold shadow-md hover:shadow-lg transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-1/2 ml-2 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                Create Account
              </button>
            </div>
          </form>
        )}
        <p className="text-sm text-center mt-4 text-blue-600 hover:underline cursor-pointer">
          <Link to="/login">Already have an account? Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupComponent;
