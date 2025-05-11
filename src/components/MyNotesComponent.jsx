import React, { useState, useEffect } from "react";
import { getDasboard } from "../Services/StudentServices"; 

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await myNotes();
        setNotes(response.data.notesList);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard data");
        setLoading(false);
        console.error("Error fetching dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">
        Welcome, {firstName}
      </h2>
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
            <button className="mt-4 inline-flex items-center bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNotes;