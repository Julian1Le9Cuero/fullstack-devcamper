const express = require("express");
const router = express.Router();

// Middlewares
const { protect } = require("../middlewares/auth");

// Routes
const {
  register,
  login,
  getAuthUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

// Route: /api/v1/auth/register
router.post("/register", register);

// Route: /api/v1/auth/login
router.post("/login", login);

// Route: /api/v1/auth/me
router.get("/me", protect, getAuthUser);

// Route: /api/v1/auth/forgotpassword
router.post("/forgotpassword", forgotPassword);

// Route: /api/v1/auth/resetpassword/:resettoken
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
