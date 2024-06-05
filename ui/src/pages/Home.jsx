// import React from "react";
// import SideBar from "../components/SideBar";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     // Implement your logout logic here
//     dispatch(logout);
//     navigate("/signin");
//   };

//   return (
//     <>
//       <SideBar />
//       <div className="relative  h-full w-full">
//         <button
//           className="absolute top-0 right-0 m-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//         <div className="h-screen w-full flex justify-center items-center text-4xl">
//           Welcome {user.email}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;


import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import TaskItem from "../components/TaskItem";
import FileItem from "../components/FileItem";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../features/task/taskSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
  const [taskChanged, setTaskChanged] = useState(false);
  const [fileItems, setFileItems] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = "http://localhost:8000/file/";

  useEffect(() => {
    setTaskChanged(false);
    dispatch(fetchTasks(user._id)).unwrap().catch(toast.error);
  }, [taskChanged, dispatch, user._id]);

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
  }, [user._id]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const handleTaskChanged = () => {
    setTaskChanged(true);
  };

  return (
    <>
      <SideBar />
      <div className="relative h-full w-full">
        <button
          className="absolute top-0 right-0 m-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
        <div className="h-screen w-full flex flex-col items-center text-4xl">
          <h1>Welcome {user.email}</h1>
          
          <div className="mt-8 w-full px-8">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
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
          
          <div className="mt-8 w-full px-8">
            <h2 className="text-2xl font-bold mt-8">Uploaded Files</h2>
            {fileItems.map((file, index) => (
              <FileItem key={index} file={file} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
