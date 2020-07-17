const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");

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

// Prevent NoSQL injections
app.use(mongoSanitize());

// Enable CORS
app.use(cors());

// Prevent XSS
app.use(xss());

// Secure app by using some http headers
app.use(helmet());

// Setup API routes
// Bootcamps routes
app.use("/api/v1/bootcamps", require("./routes/bootcamps"));
// Courses routes
app.use("/api/v1/courses", require("./routes/courses"));
// Auth routes
app.use("/api/v1/auth", require("./routes/auth"));
// Users (admin) routes
app.use("/api/v1/users", require("./routes/users"));
// Reviews routes
app.use("/api/v1/reviews", require("./routes/reviews"));

// Custom error handling middleware
const error = require("./middlewares/error");
app.use(error);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
