const express = require("express");
const multer = require("multer");
const prisma = require("../src/db.js"); // Ensure the correct path to your db file
const {
  getJobs,
  postJob,
  getJob,
} = require("../controllers/job.controller.js");
const auth = require("../middleware/auth.middleware.js");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Get all jobs
router.get("/", getJobs);

router.get("/:id", getJob);

// Add a new job with file upload
router.post("/", auth, upload.single("companyLogo"), postJob);

module.exports = router;
