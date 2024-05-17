import React from "react";
import SideBar from "../components/SideBar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Implement your logout logic here
    dispatch(logout);
    navigate("/signin");
  };

  return (
    <>
      <SideBar />
      <div className="relative  h-full w-full">
        <button
          className="absolute top-0 right-0 m-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
        <div className="h-screen w-full flex justify-center items-center text-4xl">
          Welcome {user.email}
        </div>
      </div>
    </>
  );
}

export default Home;
