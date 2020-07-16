const express = require("express");
const router = express.Router();

const Bootcamp = require("../models/Bootcamp");

// Middlewares
const advancedResults = require("../middlewares/advancedResults");

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
  .post(createBootcamp)
  .get(advancedResults(Bootcamp), getBootcamps);

// Route: /api/v1/bootcamps/:id
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

// Route: /api/v1/bootcamps/:id/photo
router.put("/:id/photo", uploadBootcampPhoto);

// Route: /api/v1/bootcamps/radius/:zipcode/:distance
router.get("/radius/:zipcode/:distance", getBootcampsByRadius);

module.exports = router;
