import React from "react";

const FooterNavigation = ({ onSelect }) => {
  return (
    <footer className="bg-gradient-to-r from-[#d84357] via-[#c63679] to-[#9b2e91] text-white">
      <div className="flex flex-col items-center py-4 space-y-2 text-sm font-semibold">
        <div className="flex space-x-8">
          <button onClick={() => onSelect("home")} className="hover:underline">Home</button>
          <button onClick={() => onSelect("about")} className="hover:underline">About Us</button>
          <button onClick={() => onSelect("contact")} className="hover:underline">Contact Us</button>
        </div>
        <div className="text-xs text-white mt-2">
          © {new Date().getFullYear()} NoteDash. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterNavigation;
