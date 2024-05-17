import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import FileItem from "../components/FileItem";

function Files() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileItems, setFileItems] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const API_URL = "http://localhost:8000/file/";

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await axios.get(API_URL + "user-files/" + user._id);
        setFileItems(response.data);
      } catch (error) {
        console.error("Error fetching user files:", error);
        toast.error("Error fetching user files.");
      }
    };

    fetchUserFiles();
  }, [selectedFile]); // Add selectedFile as a dependency

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", user._id);

    try {
      const response = await axios.post(API_URL + "upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSelectedFile(null); // Clear selected file after upload
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file.");
    }
  };

  return (
    <>
      <SideBar />
      <div className="flex flex-col mx-auto">
        <div className="flex flex-col mx-auto items-center mt-8">
          <h1 className="text-2xl font-bold mb-4">Upload Files</h1>
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 py-2 px-4 mb-4 rounded-md"
          />
          {selectedFile && (
            <div className="mb-4">
              <p className="text-gray-600">
                Selected File: {selectedFile.name}
              </p>
            </div>
          )}
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`bg-red-500 text-white py-2 px-4 rounded-md ${
              !selectedFile ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Upload
          </button>
        </div>
        <div className="flex flex-col m-auto items-center mt-8">
          <h1 className="text-2xl font-bold mb-4">Uploaded Files</h1>
          {fileItems.map((file, index) => (
            <FileItem key={index} file={file} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Files;
