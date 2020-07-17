const express = require("express");
const router = express.Router();

const Bootcamp = require("../models/Bootcamp");

// Middlewares
const advancedResults = require("../middlewares/advancedResults");
const { protect, authorize } = require("../middlewares/auth");
const checkOwnership = require("../middlewares/checkOwnership");

// Routes
const {
  createBootcamp,
  getBootcamps,
  getBootcamp,
  getBootcampsByRadius,
  updateBootcamp,
  uploadBootcampPhoto,
  deleteBootcamp,
} = require("../controllers/bootcamps");

// Route: /api/v1/bootcamps
router
  .route("/")
  .post(protect, authorize("admin", "publisher"), createBootcamp)
  .get(advancedResults(Bootcamp, "courses"), getBootcamps);

// Route: /api/v1/bootcamps/:id
router
  .route("/:id")
  .get(getBootcamp)
  .put(
    protect,
    authorize("admin", "publisher"),
    checkOwnership(Bootcamp),
    updateBootcamp
  )
  .delete(
    protect,
    authorize("admin", "publisher"),
    checkOwnership(Bootcamp),
    deleteBootcamp
  );

// Route: /api/v1/bootcamps/:id/photo
router.put(
  "/:id/photo",
  protect,
  authorize("admin", "publisher"),
  checkOwnership(Bootcamp),
  uploadBootcampPhoto
);

// Route: /api/v1/bootcamps/radius/:zipcode/:distance
router.get("/radius/:zipcode/:distance", getBootcampsByRadius);

// Route: /api/v1/bootcamps/:bootcampId/courses
// Redirect to the courses routes
router.use("/:bootcampId/courses", require("./courses"));

module.exports = router;
