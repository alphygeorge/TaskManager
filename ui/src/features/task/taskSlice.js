import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId) => {
    try {
      return await taskService.getTasks(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  try {
    return await taskService.addTask(taskData);
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      return await taskService.deleteTask(taskId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, newContent, newTitle }) => {
    try {
      return await taskService.updateTask(taskId, newTitle, newContent);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTaskIndex = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
