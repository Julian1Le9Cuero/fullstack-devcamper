const crypto = require("crypto");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const sendTokenResponse = require("../utils/sendTokenResponse");

// @desc Register new user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  sendTokenResponse(user, 200, res);
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please include an email and password.", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials.", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials.", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc Get auth user
// @route GET /api/v1/auth/me
// @access Private
exports.getAuthUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Forgot password
// @route POST /api/v1/auth/forgotpassword
// @access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    return next(new ErrorResponse("Please provide an email.", 400));
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("User does not exist.", 400));
  }

  // Generate reset token
  const resetToken = user.generateResetToken();

  await user.save({ validateBeforeSave: false });

  // Create url to reset password
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const text = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a put request to \n \n ${resetUrl}`;

  try {
    sendEmail({
      to: user.email,
      subject: "Password reset",
      text,
    });
    res.status(200).json({
      success: true,
      message: "Email sent.",
    });
  } catch (error) {
    console.error(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      success: true,
      message: "There was a problem while sending the email.",
    });
  }
});

// @desc Reset password
// @route PUT /api/v1/auth/resetpassword/:resettoken
// @access Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.password) {
    return next(new ErrorResponse("Please provide the new password", 400));
  }

  // Hash incoming reset token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  // Check if it is a valid reset token and if the time to change the password hasn't expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    return next(
      new ErrorResponse("Invalid token or time to reset password expired.", 401)
    );
  }

  const isMatch = await user.matchPassword(req.body.password);

  if (isMatch) {
    return next(
      new ErrorResponse(
        "The new password cannot be the same as the previous password.",
        401
      )
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc Update user details
// @route PATCH /api/v1/auth/me/updatedetails
// @access Private
exports.updateUserDetails = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return next(
      new ErrorResponse("Please provide the fields you want to update.", 400)
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Update user password
// @route PATCH /api/v1/auth/me/updatepassword
// @access Private
exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(
      new ErrorResponse(
        "Please provide your previous password and the new one.",
        400
      )
    );
  }

  if (currentPassword === newPassword) {
    return next(
      new ErrorResponse(
        "The previous password cannot be the same as the new one.",
        400
      )
    );
  }

  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials.", 401));
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password successfully changed.",
  });
});

// @desc Logout
// @route GET /api/v1/auth/logout
// @access Private
exports.logout = asyncHandler(async (req, res, next) => {
  const options = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };

  res.status(200).cookie("token", "none", options).json({
    success: true,
    data: {},
  });
});
