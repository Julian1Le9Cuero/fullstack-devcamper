const express = require("express");
const router = express.Router();

// Middlewares
const { protect, authorize } = require("../middlewares/auth");

// Routes
const {
  register,
  login,
  getAuthUser,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updateUserPassword,
  logout,
} = require("../controllers/auth");

// Route: /api/v1/auth/register
router.post("/register", register);

// Route: /api/v1/auth/login
router.post("/login", login);

// Route: /api/v1/auth/me
router.get("/me", protect, getAuthUser);

// Route: /api/v1/auth/me/updatedetails
router.patch(
  "/me/updatedetails",
  protect,
  authorize("user"),
  updateUserDetails
);

// Route: /api/v1/auth/me/updatepassword
router.patch(
  "/me/updatepassword",
  protect,
  authorize("user"),
  updateUserPassword
);

// Route: /api/v1/auth/forgotpassword
router.post("/forgotpassword", forgotPassword);

// Route: /api/v1/auth/resetpassword/:resettoken
router.put("/resetpassword/:resettoken", resetPassword);

// Route: /api/v1/auth/logout
router.get("/logout", logout);

module.exports = router;
