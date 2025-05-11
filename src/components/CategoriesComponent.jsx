import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios for API calls

const CategoriesComponent = () => {
  // State variables
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notes, setNotes] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories"); // Adjust with your backend API endpoint
        setCategories(response.data); // Assuming response contains an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle Filter button click to send the selected category to the backend
  const handleFilterClick = async () => {
    if (!selectedCategory) return; // Don't send request if no category is selected
    try {
      const response = await axios.post("/api/filter-notes", {
        category_id: selectedCategory, // Send the selected category_id in request body
      });
      setNotes(response.data); // Assuming the response is an array of notes
    } catch (error) {
      console.error("Error filtering notes:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Filter Notes by Category</h1>

      {/* Category Select Dropdown */}
      <div className="mb-4 flex justify-center">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border px-4 py-2 rounded-md"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleFilterClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Filter Notes
        </button>
      </div>

      {/* Notes Display */}
      <div className="mt-8">
        {notes.length === 0 ? (
          <p className="text-center text-gray-600">No notes found for the selected category.</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note.note_id} className="border-b py-4 px-4">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <p>Created by: {note.Created_by}</p>
                <p>Created at: {new Date(note.created_at).toLocaleString()}</p>
                <p>Category: {note.category_name}</p>
                <a
                  href={note.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View PDF
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoriesComponent;
