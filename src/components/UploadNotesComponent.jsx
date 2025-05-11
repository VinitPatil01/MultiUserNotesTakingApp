import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCategories, uploadNotes } from "../Services/notesServices";
import { ToastContainer,toast } from "react-toastify";

const UploadNotesComponent = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "pdf", // Default is pdf
    text: "", // For text content if type is txt
    category_id: "",
  });
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    // Fetch categories when component mounts
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    // Validate form data
    if (!formData.title || !formData.category_id) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.type === "pdf" && !file) {
      toast.error("Please upload a PDF file");
      return;
    }

    if (formData.type === "txt" && !formData.text) {
      toast.error("Please enter text content");
      return;
    }

    setLoading(true);
    
    try {
      // Create FormData object to send to the server
      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("type", formData.type);
      dataToSend.append("category_id", formData.category_id);
      
      // If type is text, append the text content
      if (formData.type === "txt") {
        dataToSend.append("text", formData.text);
      }
      
      // If type is pdf, append the file
      if (formData.type === "pdf" && file) {
        dataToSend.append("note", file);
      }
      
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      // Upload the note
      const response = await uploadNotes(dataToSend, token);
      
      toast.success("Note uploaded successfully!");
      console.log("Server Response:", response.data);
      
      // Reset form
      setFormData({
        title: "",
        type: "pdf",
        text: "",
        category_id: "",
      });
      setFile(null);
      
    } catch (error) {
      console.error("Error uploading note:", error);
      toast.error("Failed to upload note: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-purple-700 text-center">Upload New Note</h2>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="space-y-4">
        {/* Note Title */}
        <div>
          <label className="block text-sm font-medium">Note Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="Enter note title"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium">Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="pdf">PDF</option>
            <option value="txt">Text</option>
          </select>
        </div>

        {/* Select Category */}
        <div>
          <label className="block text-sm font-medium">Select Category *</label>
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : categories.length === 0 ? (
            <p>No categories available</p>
          ) : (
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Text content - only show if type is txt */}
        {formData.type === "txt" && (
          <div>
            <label className="block text-sm font-medium">Text Content *</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows={6}
              className="w-full border p-2 rounded-md"
              placeholder="Enter your note text here"
              required
            />
          </div>
        )}

        {/* File Upload - only show if type is pdf */}
        {formData.type === "pdf" && (
          <div>
            <label className="block text-sm font-medium">Upload PDF *</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full"
              required
            />
            {file && (
              <p className="text-sm text-gray-600 mt-1">
                Selected file: {file.name}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          disabled={loading}
          className={`w-full ${
            loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
          } text-white py-2 rounded-md font-semibold transition`}
        >
          {loading ? "Uploading..." : "Upload Note"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UploadNotesComponent;