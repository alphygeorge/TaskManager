import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/task/taskSlice";
import EditTaskModal from "./EditTaskModal";

const TaskItem = ({ task, onDelete, onEdit }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId))
      .unwrap()
      .then(() => {
        toast.success("Task deleted successfully!");
        onDelete();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        toast.error("Error deleting task!");
      });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.content}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onTaskUpdated={onEdit}
      />
    </>
  );
};

export default TaskItem;
