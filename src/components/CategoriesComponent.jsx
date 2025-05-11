import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios for API calls
import { filterNotesByCategories, getCategories } from "../Services/notesServices";
import { getToken } from "../Services/StudentServices";
import { useNavigate } from "react-router-dom";
const CategoriesComponent = () => {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notes, setNotes] = useState([]);
  const token = getToken();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };


  const handleFilterClick = async () => {
    if (!selectedCategory) return;
    try {
      const response = await filterNotesByCategories(selectedCategory, token)
      setNotes(response.data);
    } catch (error) {
      console.error("Error filtering notes:", error);
    }
  };
  const handleView = (note_id)=>{
    navigate(`/viewnotes/${note_id}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Filter Notes by Category</h1>
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
      <div className="text-center mb-6">
        <button
          onClick={handleFilterClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Filter Notes
        </button>
      </div>
      <div className="mt-8">
        {notes.length === 0 ? (
          <p className="text-center text-gray-600">No notes found for the selected category.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div
                key={note.note_id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200 text-left hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Title: {note.title}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600"><span className="font-medium">Note ID:</span> {note.note_id}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Text:</span> {note.text}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Created By:</span> {note.first_name}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Created At:</span> {new Date(note.created_at).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Category Name:</span> {note.category_name}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Type:</span> {note.type}</p>
                </div>
                <button className="mt-4 inline-flex items-center bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors duration-200" onClick={() => { handleView(note.note_id) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesComponent;
