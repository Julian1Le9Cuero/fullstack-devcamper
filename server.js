const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

// Load env vars
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Parse incoming JSON
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Connect to databse
const connectDB = require("./config/db");
connectDB();

// Cookie parser
app.use(cookieParser());

// Enable file uploads
app.use(fileupload());

// Setup API routes
// Bootcamps routes
app.use("/api/v1/bootcamps", require("./routes/bootcamps"));
// Courses routes
app.use("/api/v1/courses", require("./routes/courses"));
// Auth routes
app.use("/api/v1/auth", require("./routes/auth"));

// Custom error handling middleware
const error = require("./middlewares/error");
app.use(error);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
