const express = require("express");
// const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const jobsRoutes = require("./routes/job.route.js");
const path = require("path");
const authRoutes = require('./routes/auth.route.js');
const auth = require("./middleware/auth.middleware.js");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
// app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Serve uploaded files

app.use("/api/jobs", jobsRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;