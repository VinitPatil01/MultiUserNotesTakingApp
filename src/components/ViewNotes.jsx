import React, { useState, useEffect } from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../Services/StudentServices";
import { updateNotes } from "../Services/notesServices";
import { getNotesbyId } from "../Services/notesServices";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const ViewNotesPage = () => {
    const { note_id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    var token = getToken();
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await getNotesbyId(note_id,token);
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
    }, [note_id,token]);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleTextChange = (e) => {
        setEditedText(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            await updateNotes(note_id,token,editedText);
            setNote((prev) => ({ ...prev, text: editedText }));
            console.log(editedText)
            setEditMode(false);
            toast.success("Successfull Updated Note")
            
        } catch (err) {
            console.error("Error updating note:", err);
            toast.error("Failed to update note");
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

                    {note.type === "text" ? (
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold">Content</h2>
                                {!editMode && (
                                    <button
                                        onClick={handleEditToggle}
                                        className="flex items-center text-blue-600 hover:text-blue-800"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Edit
                                    </button>
                                )}
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
                    ) : (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4">PDF Document</h2>
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
                                                <div className="overflow-hidden" style={{ height: '1000px' }}>
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

                <div className="border-t border-gray-200 p-4 flex justify-end">
                    <a href="/dashboard" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                        Back to Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ViewNotesPage;