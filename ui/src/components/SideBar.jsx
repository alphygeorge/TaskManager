import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaFolder } from "react-icons/fa";

function SideBar() {
  return (
    <div className="h-screen  w-1/5  flex flex-col bg-red-500">
      <Link
        to="/"
        className="flex items-center justify-center text-xl mb-4 hover:bg-yellow-200 py-3"
      >
        <FaHome className="w-6 h-6 mr-2" /> Home
      </Link>
      <Link
        to="/task"
        className="flex items-center justify-center text-xl mb-4 hover:bg-yellow-200 py-3"
      >
        <FaTasks className="w-6 h-6 mr-2" /> Tasks
      </Link>
      <Link
        to="/file"
        className="flex items-center justify-center text-xl mb-4 hover:bg-yellow-200 py-3"
      >
        <FaFolder className="w-6 h-6 mr-2" /> Files
      </Link>
    </div>
  );
}

export default SideBar;
