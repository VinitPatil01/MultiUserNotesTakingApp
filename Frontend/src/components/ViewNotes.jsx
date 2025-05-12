import React, { useState, useEffect } from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../Services/StudentServices";
import { updateNotes, getNotesbyId } from "../Services/notesServices";
import { deleteNotes } from "../Services/notesServices"; 
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const ViewNotesPage = () => {
    const { note_id } = useParams();
    const navigate = useNavigate(); 
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); 
    const token = getToken();
    
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await getNotesbyId(note_id, token);
                console.log(response.data);
                setNote(response.data);
                setEditedText(response.data.text);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch note details");
                setLoading(false);
                console.error("Error fetching note:", err);
            }
        };

        fetchNote();
    }, [note_id, token]);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleTextChange = (e) => {
        setEditedText(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            await updateNotes(note_id, token, editedText);
            setNote((prev) => ({ ...prev, text: editedText }));
            console.log(editedText);
            setEditMode(false);
            toast.success("Successfully Updated Note");
            
        } catch (err) {
            console.error("Error updating note:", err);
            toast.error("Failed to update note");
        }
    };

    const handleDeleteConfirm = () => {
        setShowDeleteConfirm(true);
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    const handleDelete = async () => {
        try {
            await deleteNotes(note_id, token);
            toast.success("Note successfully deleted");
            
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            console.error("Error deleting note:", err);
            toast.error("Failed to delete note");
            setShowDeleteConfirm(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-purple-600 text-white p-4">
                    <h1 className="text-2xl font-bold">{note.title}</h1>
                    <div className="flex justify-between items-center mt-2">
                        <div className="text-sm">
                            <span className="bg-purple-800 text-white px-2 py-1 rounded text-xs">{note.category_name}</span>
                            <span className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">{note.type}</span>
                        </div>
                        <div className="text-sm">Note ID: {note.note_id}</div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="mb-4 text-gray-600">
                        <div><span className="font-semibold">Created By:</span> {note.first_name}</div>
                        <div><span className="font-semibold">Created At:</span> {new Date(note.created_at).toLocaleString()}</div>
                    </div>

                    {note.type === "txt" ? (
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold">Content</h2>
                                <div className="flex space-x-2">
                                    {!editMode && (
                                        <>
                                            <button
                                                onClick={handleEditToggle}
                                                className="flex items-center text-blue-600 hover:text-blue-800"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button
                                                onClick={handleDeleteConfirm}
                                                className="flex items-center text-red-600 hover:text-red-800"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {editMode ? (
                                <div className="mt-4">
                                    <textarea
                                        value={editedText}
                                        onChange={handleTextChange}
                                        className="w-full border border-gray-300 rounded p-3 min-h-[200px]"
                                    />
                                    <div className="flex justify-end mt-4 space-x-3">
                                        <button
                                            onClick={() => {
                                                setEditMode(false);
                                                setEditedText(note.text);
                                            }}
                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleUpdate}
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-4 rounded border border-gray-200 min-h-[100px]">
                                    {note.text}
                                </div>
                            )}
                        </div>
                    ) : note.type === "pdf" && (
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">PDF Document</h2>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="flex items-center text-red-600 hover:text-red-800"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                            <div className="border border-gray-300 rounded">
                                <div className="flex justify-center items-center p-4 bg-gray-100">
                                    <div className="w-full">
                                        <div className="flex justify-between mb-2">
                                            <button
                                                disabled={pageNumber <= 1}
                                                onClick={() => setPageNumber((prev) => prev - 1)}
                                                className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-200 disabled:text-gray-400"
                                            >
                                                Previous
                                            </button>
                                            <p className="text-sm">Page {pageNumber} of {numPages || "--"}</p>
                                            <button
                                                disabled={pageNumber >= numPages}
                                                onClick={() => setPageNumber((prev) => prev + 1)}
                                                className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-200 disabled:text-gray-400"
                                            >
                                                Next
                                            </button>
                                        </div>

                                        <div className="flex justify-center border border-gray-300 bg-white min-h-[500px]">
                                            <Document
                                                file={note.pdf_url}
                                                onLoadSuccess={onDocumentLoadSuccess}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                                className="w-full"
                                            >
                                                <div className="overflow-hidden" style={{ height: '800px' }}>
                                                    <Page
                                                        pageNumber={pageNumber}
                                                        renderTextLayer={false}
                                                        renderAnnotationLayer={false}
                                                    />
                                                </div>
                                            </Document>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 p-4 flex justify-between">
                    <a href="/dashboard" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                        Back to Dashboard
                    </a>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                        <p className="mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleDeleteCancel}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewNotesPage;