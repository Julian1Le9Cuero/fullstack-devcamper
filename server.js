const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");

// Load env vars
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Parse incoming JSON
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Connect to databse
const connectDB = require("./config/db");
connectDB();

// Enable file uploads
app.use(fileupload());

// Setup API routes
// Bootcamps routes
const bootcamps = require("./routes/bootcamps");
app.use("/api/v1/bootcamps", bootcamps);

// Custom error handling middleware
const error = require("./middlewares/error");
app.use(error);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
