const express = require("express");
const multer = require("multer"); // File upload handling
const path = require("path");
const File = require("../models/file"); // Assuming file schema is in models/file.js
const router = express.Router();

// Configure Multer storage for uploads
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload route (POST request)
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  // Validate file size and type (adapt based on your constraints)
  if (req.file.size > 5 * 1024 * 1024) {
    return res.status(400).send("File size exceeds 5MB limit");
  }
  const allowedExtensions = [".jpg", ".pdf"];
  const ext = path.extname(req.file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return res
      .status(400)
      .send("Unsupported file type. Only .jpg and .pdf allowed");
  }

  try {
    const newFile = new File({
      fileName: req.file.filename,
      userId: req.body.userId, // Assuming user ID from req.body.id (POST request)
      uploadDate: Date.now(),
    });
    await newFile.save();
    res.json({
      message: "File uploaded successfully!",
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("Error saving uploaded file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// View user files (GET request)
router.get("/user-files/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userFiles = await File.find({ userId });

    res.json(userFiles);
  } catch (error) {
    console.error("Error retrieving user files:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/download/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).send("File not found");
    }
    // Construct the absolute file path using 'path.join'
    const filePath = path.join(__dirname, "../public/uploads", file.fileName);
    // Send the file as an attachment for download
    res.download(filePath, file.fileName);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
