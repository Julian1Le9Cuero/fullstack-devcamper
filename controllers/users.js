const User = require("../models/User");
const asyncHandler = require("../middlewares/async");

// @desc Create new user
// @route POST /api/v1/users
// @access Private
exports.createUser = asyncHandler(async (req, res, next) => {
  await User.create(req.body);

  res.status(201).json({
    success: true,
    message: "User created",
  });
});

// @desc Get all users
// @route GET /api/v1/users
// @access Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get single user
// @route GET /api/v1/users/:id
// @access Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id ${req.params.id}.`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Update user credentials
// @route PUT /api/v1/users/:id
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  await user.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
