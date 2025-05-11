import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerStudent } from "../Services/StudentServices";

const SignupComponent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    prn: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    gender: "",
    course: "",
    center: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateStepOne = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    return newErrors;
  };

  const validateStepTwo = () => {
    const newErrors = {};
    if (!formData.prn.trim()) newErrors.prn = "PRN is required.";
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.mobile_number.trim() || !/^\d{10}$/.test(formData.mobile_number)) newErrors.mobile_number = "Valid 10-digit mobile number is required.";
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
      toast.error("Please fill all required fields");
    } else {
      setErrors({});
      setStep(2);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const validationErrors = validateStepTwo();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields correctly");
    } else {
      setErrors({});
      setLoading(true);
      try {
        const response = await registerStudent(formData);
        console.log("Registration response:", response);
        
        if (response.status === 201) {
          toast.success("Account created successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#d84357] via-[#c63679] to-[#9b2e91]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
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
                className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
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
                className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#d84357] to-[#9b2e91] text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Next
            </motion.button>
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
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
                />
                {errors.prn && <p className="text-red-500 text-sm">{errors.prn}</p>}
              </div>
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
                />
                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
                />
                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  name="mobile_number"
                  type="text"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
                />
                {errors.mobile_number && <p className="text-red-500 text-sm">{errors.mobile_number}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
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
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
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
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-[#c63679]"
                />
                {errors.center && <p className="text-red-500 text-sm">{errors.center}</p>}
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 mr-2 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold shadow-md hover:shadow-lg transition"
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-1/2 ml-2 py-2 rounded-lg bg-gradient-to-r from-[#d84357] to-[#9b2e91] text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </motion.button>
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