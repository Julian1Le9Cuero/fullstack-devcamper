const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Middlewares
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");

// Routes
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

// Route: /api/v1/users
router
  .route("/")
  .get(protect, authorize("admin"), advancedResults(User), getUsers)
  .post(protect, authorize("admin"), createUser);

// Route: /api/v1/users/:id
router
  .route("/:id")
  .get(protect, authorize("admin"), getUser)
  .put(protect, authorize("admin"), updateUser)
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;
