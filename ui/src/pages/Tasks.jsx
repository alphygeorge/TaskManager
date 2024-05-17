import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import AddTaskModal from "../components/AddTaskModal";
import TaskItem from "../components/TaskItem";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../features/task/taskSlice";
import ClipLoader from "react-spinners/ClipLoader";

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskChanged, setTaskChanged] = useState(false); // New state variable
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    setTaskChanged(false);
    dispatch(fetchTasks(user._id)).unwrap().catch(toast.error);
  }, [taskChanged]); // Listen for changes in taskAdded

  const handleTaskChanged = () => {
    setTaskChanged(true); // Set taskAdded to true when a new task is added
  };

  return (
    <>
      <SideBar />
      <div className="bg-gray-200 flex flex-col h-screen w-full m-auto">
        <div className="m-5 flex justify-center">
          <button
            className="border rounded-md bg-red-500 text-white py-2 px-4"
            onClick={() => setIsModalOpen(true)}
          >
            Add Task
          </button>
        </div>
        <div className="m-5 flex flex-col">
          {isLoading ? (
            <ClipLoader
              color="#00CED1"
              loading={isLoading}
              size={150}
              aria-label="Loading Spinner"
              className="flex m-auto"
            />
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onEdit={handleTaskChanged}
                onDelete={handleTaskChanged}
              />
            ))
          )}
        </div>
      </div>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={handleTaskChanged} // Pass the handler function to the modal
      />
    </>
  );
}

export default Tasks;
