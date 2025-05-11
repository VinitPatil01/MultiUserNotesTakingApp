import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MyNotesComponent from "./MyNotesComponent";
import ProfileComponent from "./ProfileComponent";
import AboutUsComponent from "./AboutUsComponent";
import ContactUsComponent from "./ContactUsComponent";
import CategoriesComponent from "./CategoriesComponent";
import UploadNotesComponent from "./UploadNotesComponent";
import NotesList from "./AllNotes";

import {
  HomeIcon,
  FileTextIcon,
  UsersIcon,
  UploadIcon,
  TagsIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import GroupNotesComponent from "./GroupNotesComponent";

const sidebarItems = [
  { label: "Dashboard", icon: HomeIcon },
  { label: "My Notes", icon: FileTextIcon },
  { label: "Group Notes", icon: UsersIcon },
  { label: "Upload Notes", icon: UploadIcon },
  { label: "Categories", icon: TagsIcon },
  { label: "Profile", icon: UsersIcon },
  { label: "Logout", icon: LogOutIcon },
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

  const handleFooterClick = (label) => {
    setActiveTab(label);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <NotesList />;
        
      case "My Notes":
        return <MyNotesComponent />;
      case "Group Notes":
        return <GroupNotesComponent />;
      case "Upload Notes":
        return <UploadNotesComponent />;
      case "Categories":
        return <CategoriesComponent />;
      case "Profile":
        return <ProfileComponent />;
      case "About Us":
        return <AboutUsComponent />;
      case "Contact Us":
        return <ContactUsComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen flex-col">
      {/* Header */}
      <header className="bg-purple-700 p-4 text-white flex items-center justify-between sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-2">
          {/* Logo (Could be a simple icon or text) */}
          <div className="w-8 h-8 bg-white text-purple-700 rounded-full flex justify-center items-center font-semibold">
            NS
          </div>
          {/* App Name */}
          <h1 className="text-2xl font-bold">NoteSphere</h1>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex space-x-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-purple-300"
            onClick={() => handleFooterClick("Dashboard")}
          >
            Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-purple-300"
            onClick={() => handleFooterClick("About Us")}
          >
            About Us
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-purple-300"
            onClick={() => handleFooterClick("Contact Us")}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </header>

      {/* Sidebar */}
      <div className="flex flex-1">
        <motion.div
          initial={{ width: 64 }}
          animate={{ width: isSidebarOpen ? 256 : 80 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-md p-4 space-y-4 h-fit sticky top-16"
        >
          <div className={`w-full flex ${isSidebarOpen ? "justify-end pr-4" : "justify-center"} mb-6`}>
            <button
              className="text-gray-700 hover:text-purple-600"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <MenuIcon size={28} />
            </button>
          </div>

          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                key={index}
                onClick={() => handleItemClick(item.label)}
                className={`flex items-center ${isSidebarOpen ? "justify-start space-x-3" : "justify-center"} px-3 py-2 rounded-md w-full transition ${
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
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-700">NoteSphere Dashboard</h2>
          </div>

          {/* Render Content */}
          <div>{renderContent()}</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md p-4">
        <div className="flex justify-center items-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-gray-700 hover:text-purple-600"
            onClick={() => handleFooterClick("Home")}
          >
            Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-gray-700 hover:text-purple-600"
            onClick={() => handleFooterClick("About Us")}
          >
            About Us
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-gray-700 hover:text-purple-600"
            onClick={() => handleFooterClick("Contact Us")}
          >
            Contact Us
          </motion.button>
        </div>
      
         {/* Contact Info Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 text-center space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-800">Reach Out to Us</h3>
      
        
        <div className="space-y-2">
          <p className="text-gray-700">
            <strong>Email:</strong> support@notedash.com
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> +123-456-7890
          </p>
          <p className="text-gray-700">
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/developer1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
             Vinit Patil
            </a>
            ,{" "}
            <a
              href="https://www.linkedin.com/in/developer2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              Sumaya Khan
            </a>
            ,{" "}
            <a
              href="https://www.linkedin.com/in/developer3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              Tushar Meshram
            </a>
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> 123 NoteDash Street, Software City, Techland, 56789
          </p>
        </div>
          <div className="text-center text-sm text-gray-500 mt-2">
          &copy; 2025 NoteSphere. All Rights Reserved.
        </div>
      </motion.div>
      </footer>
    </div>
  );
};

export default DashboardComponent;
