import axios from "axios";

const API_URL = "http://localhost:8000/task/";

const addTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL + "add", taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

const getTasks = async (userId) => {
  try {
    const response = await axios.get(API_URL + `view/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await axios.post(API_URL + "delete", { id: taskId });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

const updateTask = async (taskId, newTitle, newContent) => {
  try {
    const response = await axios.post(API_URL + "edit", {
      id: taskId,
      newContent: newContent,
      newTitle: newTitle,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

const taskService = {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
};

export default taskService;
