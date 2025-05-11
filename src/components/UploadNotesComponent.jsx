import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const UploadNotesComponent = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "pdf", // Default type is "pdf"
    file: null,
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    // Simulating an API call with dummy data for categories
    setTimeout(() => {
      const dummyCategories = [
        { category_id: 1, category_name: "Data Structures", subject: "Computer Science" },
        { category_id: 2, category_name: "Algorithms", subject: "Computer Science" },
        { category_id: 3, category_name: "Operating Systems", subject: "Computer Science" },
        { category_id: 4, category_name: "Networks", subject: "Computer Science" },
      ];

      // Filter for Computer Science related categories
      const filteredCategories = dummyCategories.filter(category => category.subject === "Computer Science");
      setCategories(filteredCategories);
      setLoadingCategories(false); // Stop loading indicator
    }, 1000); // Simulating delay for API call
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleUpload = async () => {
    if (!formData.title || !formData.type || !formData.file || !formData.categoryId) {
      alert("Please fill all fields and upload a file.");
      return;
    }

    // Create a FormData object to send data to the backend
    const dataToSend = new FormData();
    
    // Add the non-file data (in JSON format) to the FormData object
    const noteData = {
      title: formData.title,
      type: formData.type,
      category_id: formData.categoryId,
    };
    dataToSend.append("noteData", JSON.stringify(noteData)); // Adding JSON as string

    // Append the file separately
    dataToSend.append("file", formData.file); 

    try {
      // Send the form data to the backend (replace with your actual backend URL)
      const response = await axios.post("/api/upload-note", dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to handle file uploads
        },
      });

      // Check the response from the backend
      if (response.status === 200) {
        alert("Note uploaded successfully!");
        console.log("Server Response:", response.data);
        // Reset form
        setFormData({
          title: "",
          type: "pdf", // Reset to default "pdf"
          file: null,
          categoryId: "",
        });
      }
    } catch (error) {
      console.error("Error uploading note:", error);
      alert("Failed to upload note.");
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

      <div className="space-y-4">
        {/* Note Title */}
        <div>
          <label className="block text-sm font-medium">Note Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="Enter note title"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="pdf">PDF</option>
            <option value="txt">Text</option>
          </select>
        </div>

        {/* Select Category */}
        <div>
          <label className="block text-sm font-medium">Select Category</label>
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : categories.length === 0 ? (
            <p>No categories available</p>
          ) : (
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
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

        {/* Upload File */}
        <div>
          <label className="block text-sm font-medium">Upload File</label>
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition"
        >
          Upload Note
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UploadNotesComponent;
