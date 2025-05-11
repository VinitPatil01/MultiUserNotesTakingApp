import React from "react";
import { motion } from "framer-motion";
import { UserIcon, MailIcon, PhoneIcon, BookOpenIcon, MapPinIcon, UsersIcon } from "lucide-react";

const ProfileComponent = () => {
  const studentDetails = {
    prn: "1234567890",
    fullName: "John Doe",
    email: "john.doe@example.com",
    mobileNumber: "+1 234 567 890",
    gender: "Male",
    course: "Computer Science",
    center: "Tech Center",
  };

  const groups = [
    { groupId: "1", groupName: "Web Development" },
    { groupId: "2", groupName: "Machine Learning" },
    { groupId: "3", groupName: "ReactJS" },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-xl shadow-xl space-y-8"
      initial="hidden"
      animate="show"
      variants={fadeIn}
    >
      {/* Header */}
      <div className="text-center">
        <motion.h1
          className="text-4xl font-bold text-purple-700 mb-1"
          variants={fadeIn}
        >
          👤 Profile Overview
        </motion.h1>
        <p className="text-gray-500">Detailed student information and group affiliations</p>
      </div>

      {/* Student Info Card */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6"
        variants={fadeIn}
      >
        <div className="flex items-center space-x-3">
          <UserIcon className="text-purple-500" />
          <p><strong>Full Name:</strong> {studentDetails.fullName}</p>
        </div>
        <div className="flex items-center space-x-3">
          <MailIcon className="text-purple-500" />
          <p><strong>Email:</strong> {studentDetails.email}</p>
        </div>
        <div className="flex items-center space-x-3">
          <PhoneIcon className="text-purple-500" />
          <p><strong>Mobile:</strong> {studentDetails.mobileNumber}</p>
        </div>
        <div className="flex items-center space-x-3">
          <BookOpenIcon className="text-purple-500" />
          <p><strong>Course:</strong> {studentDetails.course}</p>
        </div>
        <div className="flex items-center space-x-3">
          <MapPinIcon className="text-purple-500" />
          <p><strong>Center:</strong> {studentDetails.center}</p>
        </div>
        <div className="flex items-center space-x-3">
          <p className="font-semibold"><strong>Gender:</strong> {studentDetails.gender}</p>
        </div>
        <div className="flex items-center space-x-3">
          <p className="font-semibold"><strong>PRN:</strong> {studentDetails.prn}</p>
        </div>
      </motion.div>

      {/* Groups */}
      <motion.div className="pt-4" variants={fadeIn}>
        <div className="flex items-center mb-2">
          <UsersIcon className="text-purple-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">Your Groups</h3>
        </div>

        {groups.length > 0 ? (
          <motion.ul
            className="space-y-2 mt-2"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {groups.map((group) => (
              <motion.li
                key={group.groupId}
                className="bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-lg px-4 py-2 shadow-sm cursor-pointer transition"
                variants={fadeIn}
              >
                {group.groupName}
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <p className="text-gray-500 mt-2">No groups found.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProfileComponent;
