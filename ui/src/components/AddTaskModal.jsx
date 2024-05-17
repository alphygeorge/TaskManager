import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../features/task/taskSlice";

const AddTaskModal = ({ isOpen, onClose, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, content, createdBy: user._id };
    dispatch(addTask(taskData))
      .unwrap()
      .then(() => {
        toast.success("Task added successfully!");
        onClose();
        onTaskAdded(); // Call the function to indicate that a new task has been added
        setTitle("");
        setContent("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        toast.error("Error adding task!");
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Task"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
