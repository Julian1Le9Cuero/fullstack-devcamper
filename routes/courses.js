const express = require("express");
const router = express.Router({ mergeParams: true });

const Course = require("../models/Course");

// Middlewares
const advancedResults = require("../middlewares/advancedResults");

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
  .post(createCourse)
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  );

// Route: /api/v1/courses/:id
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
