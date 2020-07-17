const express = require("express");
const router = express.Router({ mergeParams: true });

const Course = require("../models/Course");

// Middlewares
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");
const checkOwnership = require("../middlewares/checkOwnership");

// Routes
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

// Route: /api/v1/bootcamps/:bootcampId/courses
// Route: /api/v1/courses
router
  .route("/")
  .post(protect, authorize("admin", "publisher"), createCourse)
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  );

// Route: /api/v1/courses/:id
router
  .route("/:id")
  .get(getCourse)
  .put(
    protect,
    authorize("admin", "publisher"),
    checkOwnership(Course),
    updateCourse
  )
  .delete(
    protect,
    authorize("admin", "publisher"),
    checkOwnership(Course),
    deleteCourse
  );

module.exports = router;
