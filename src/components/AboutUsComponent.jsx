import React from "react";
import { motion } from "framer-motion";

const AboutUsComponent = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-8">
      {/* About the App */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-semibold text-gray-800">About Us</h1>

        <h2 className="text-2xl font-semibold text-gray-800">About the Notes-Taking App</h2>
        <p className="text-lg text-gray-700">
          This Notes-Taking App is designed to help users organize their notes efficiently. 
          With an intuitive and user-friendly interface, this app allows students, professionals, 
          and anyone who needs a digital notebook to take, manage, and organize their notes easily. 
        </p>
        <p className="text-lg text-gray-700">
          The app allows users to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg"
          >
            Create and manage personal notes.
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg"
          >
            Store notes under specific categories.
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg"
          >
            Upload and share notes in group settings.
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg"
          >
            Maintain a profile with personal information.
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg"
          >
            Enjoy a clean, minimalistic interface for distraction-free note-taking.
          </motion.li>
        </ul>
        <p className="text-lg text-gray-700">
          The goal is to provide an efficient, accessible, and easy-to-use platform for individuals who wish to take and organize their thoughts, ideas, and study materials in one place.
        </p>
      </motion.div>

      {/* About the Developers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800">About the Developers</h2>
        <p className="text-lg text-gray-700">
          This app was developed by a team of three software development students who are passionate about creating impactful applications. Below are their profiles:
        </p>

        {/* Developer 1 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex items-center space-x-6"
        >
          <img
            src="developer1-photo.jpg" // Replace with actual image path
            alt="Developer 1"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Developer 1</h3>
            <p className="text-sm text-gray-600">Full Stack Developer | React, Node.js</p>
            <p className="text-gray-700">
              Developer 1 is a passionate full-stack developer with experience in building applications using React and Node.js. Currently studying software development, Developer 1 focuses on creating user-friendly, efficient applications.
            </p>
          </div>
        </motion.div>

        {/* Developer 2 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="flex items-center space-x-6"
        >
          <img
            src="developer2-photo.jpg" // Replace with actual image path
            alt="Developer 2"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Developer 2</h3>
            <p className="text-sm text-gray-600">Front-End Developer | React, Tailwind CSS</p>
            <p className="text-gray-700">
              Developer 2 specializes in front-end development, creating dynamic and responsive user interfaces using React and Tailwind CSS. A student of software development, Developer 2 enjoys crafting beautiful and functional designs.
            </p>
          </div>
        </motion.div>

        {/* Developer 3 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="flex items-center space-x-6"
        >
          <img
            src="developer3-photo.jpg" // Replace with actual image path
            alt="Developer 3"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Developer 3</h3>
            <p className="text-sm text-gray-600">Backend Developer | Node.js, MySQL</p>
            <p className="text-gray-700">
              Developer 3 focuses on building robust backend systems with Node.js and MySQL. As a software development student, Developer 3 ensures that the application's server-side logic is efficient, secure, and scalable.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
        className="mt-8 text-center text-gray-500 text-sm"
      >
        <p>© 2025 Notes-Taking App. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default AboutUsComponent;

