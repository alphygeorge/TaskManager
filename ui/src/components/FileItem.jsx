import React, { useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify"; // Import react-toastify

const FileItem = ({ file }) => {
  const API_URL = "http://localhost:8000/file/";
  const [showPopup, setShowPopup] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const handleDownload = async (fileId) => {
    try {
      const response = await axios({
        url: API_URL + "download/" + fileId,
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
      });
      toast.success("File downloaded successfully!"); // Show success toast
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Error downloading file!"); // Show error toast
    }
  };

  const handleGenerateLink = (fileId) => {
    const link = API_URL + "download/" + fileId;
    setDownloadLink(link);
    setShowPopup(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(downloadLink);
    toast.success("Link copied to clipboard!"); // Show success toast
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <p className="text-lg font-semibold">{file.fileName}</p>
        <FaDownload
          className="text-lack-500 hover:text-red-700 cursor-pointer"
          onClick={() => handleDownload(file._id)}
        />
      </div>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-600 m-4"
        onClick={() => handleGenerateLink(file._id)}
      >
        Generate Download Link
      </button>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <p className="mb-4 text-lg font-semibold">Download Link:</p>
            <div className="flex items-center justify-between mb-4">
              <input
                className="w-full px-4 py-2 bg-gray-100 rounded mr-2"
                type="text"
                value={downloadLink}
                readOnly
              />
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-600"
                onClick={handleCopyLink}
              >
                Copy
              </button>
            </div>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-600"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileItem;
