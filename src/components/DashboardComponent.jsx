import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HomeIcon,
  FileTextIcon,
  UsersIcon,
  UploadIcon,
  TagsIcon,
  SettingsIcon,
  LogOutIcon,
  EyeIcon,
  MenuIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { label: "Dashboard", icon: HomeIcon },
  { label: "My Notes", icon: FileTextIcon },
  { label: "Group Notes", icon: UsersIcon },
  { label: "Upload Notes", icon: UploadIcon },
  { label: "Categories", icon: TagsIcon },
  { label: "Profile Settings", icon: SettingsIcon },
  { label: "Logout", icon: LogOutIcon },
];

const notes = [
  {
    noteId: "001",
    title: "React Basics",
    createdBy: "JohnDoe",
    createdAt: "2025-05-10",
  },
  {
    noteId: "002",
    title: "Advanced JavaScript",
    createdBy: "JaneSmith",
    createdAt: "2025-05-09",
  },
];

const DashboardComponent = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleItemClick = (label) => {
    if (label === "Logout") {
      localStorage.clear();
      navigate("/login");
    } else {
      setActiveTab(label);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
      case "My Notes":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">{activeTab}</h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <motion.div
                  key={note.noteId}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200 text-left"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
                  <p className="text-sm text-gray-600">Note ID: {note.noteId}</p>
                  <p className="text-sm text-gray-600">Created By: {note.createdBy}</p>
                  <p className="text-sm text-gray-600">Created At: {note.createdAt}</p>
                  <button className="mt-3 inline-flex items-center text-purple-600 hover:underline">
                    <EyeIcon className="mr-1" size={16} /> View
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case "Group Notes":
        return <h1 className="text-3xl font-semibold text-gray-800">Group Notes</h1>;
      case "Upload Notes":
        return <h1 className="text-3xl font-semibold text-gray-800">Upload Notes</h1>;
      case "Categories":
        return <h1 className="text-3xl font-semibold text-gray-800">Categories</h1>;
      case "Profile Settings":
        return <h1 className="text-3xl font-semibold text-gray-800">Profile Settings</h1>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ width: 64 }}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-md p-4 space-y-4 transition-all duration-300 overflow-hidden"
      >
        {/* Hamburger button container */}
        <div
          className={`w-full flex ${
            isSidebarOpen ? "justify-end pr-4" : "justify-center"
          } mb-6`}
        >
          <button
            className="text-gray-700 hover:text-purple-600"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon size={28} />
          </button>
        </div>

        {/* Sidebar buttons */}
        {sidebarItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.button
              whileHover={{ scale: 1.05 }}
              key={index}
              onClick={() => handleItemClick(item.label)}
              className={`flex items-center ${
                isSidebarOpen ? "justify-start space-x-3" : "justify-center"
              } px-3 py-2 rounded-md w-full transition ${
                activeTab === item.label
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
              }`}
            >
              <IconComponent size={isSidebarOpen ? 24 : 30} />
              {isSidebarOpen && <span>{item.label}</span>}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-end mb-4">
          <h2 className="text-2xl font-bold text-purple-700">NoteDash</h2>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardComponent;
