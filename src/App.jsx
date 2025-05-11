import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent"; // Adjust path if needed
import SignupComponent from "./components/SignupComponent"; // Optional
import DashboardComponent from "./components/DashboardComponent";
import ViewNotesPage from "./components/ViewNotes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="/viewnotes/:note_id" element={<ViewNotesPage />} />
        {/* Add any additional routes here */}
      </Routes>
    </Router>
  );
}

export default App;
