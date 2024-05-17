const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");
const fileRoute = require("./routes/file");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/task2", {})
  .then(() => console.log("connected sucessfully"))
  .catch((err) => {
    console.error(err);
  });

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));
app.use(cors());

app.get("/", async (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

app.use("/user", userRoute);
app.use("/task", taskRoute);
app.use("/file", fileRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
