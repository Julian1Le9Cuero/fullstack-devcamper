const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc Add new review for bootcamp
// @route POST /api/v1/bootcamps/:bootcampId/reviews
// @access Private
exports.addReview = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with id ${req.params.bootcampId}`,
        404
      )
    );
  }

  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc Get reviews for bootcamp
// @route GET /api/v1/bootcamps/:bootcampId/reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({
      bootcamp: req.params.bootcampId,
    })
      .populate("bootcamp", ["name", "description"])
      .populate("user", ["name"]);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc Get reviews by user
// @route GET /api/v1/reviews/users/:userId
// @access Public
exports.getUserReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({ user: req.params.userId }).populate({
    path: "bootcamp",
    select: "name",
  });

  if (!reviews) {
    return next(
      new ErrorResponse(`Reviews not found for user ${req.params.userId}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: reviews,
  });
});

// @desc Get single review
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc Update review
// @route PUT /api/v1/reviews/:id
// @access Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  for (update in req.body) {
    res.resource[update] = req.body[update];
  }

  await res.resource.save();

  res.status(200).json({
    success: true,
    data: res.resource,
  });
});

// @desc Delete review
// @route DELETE /api/v1/reviews/:id
// @access Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  await res.resource.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
