const Task = require("../models/task");
const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = Router();

router.post("/add", async (req, res) => {
  try {
    await Task.create({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.body.createdBy,
    });
    // Send success response
    res.status(201).send("Task added successfully");
  } catch (error) {
    console.error("Error creating task:", error);
    // Handle the error, send an appropriate response
    res.status(500).send("Internal Server Error");
  }
});

router.get("/view/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find tasks created by the user
    const tasks = await Task.find({ createdBy: userId }).populate("createdBy");
    res.json(tasks); // Sending tasks in the response
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/delete", async (req, res) => {
  try {
    const taskId = req.body.id;
    // Find the task by ID and delete it
    await Task.findByIdAndDelete(taskId);
    // Send success response
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting task:", error);
    // Handle the error, send an appropriate response
    res.status(500).send("Internal Server Error");
  }
});

router.post("/edit", async (req, res) => {
  try {
    const taskId = req.body.id;
    const newTitle = req.body.newTitle;
    const newContent = req.body.newContent;

    // Find the task by ID and update its name and content
    await Task.findByIdAndUpdate(taskId, {
      content: newContent,
      title: newTitle,
    });

    // Send success response
    res.status(200).send("Task updated successfully");
  } catch (error) {
    console.error("Error updating task:", error);
    // Handle the error, send an appropriate response
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
