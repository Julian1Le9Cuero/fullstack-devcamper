const asyncHandler = require("./async");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// Protect routes that require authentication
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  //   Get token from authorization header if provided
  if (req.headers.authorization) {
    if (!req.headers.authorization.startsWith("Bearer")) {
      return next(new ErrorResponse("No token, access denied.", 403));
    }
    token = req.headers.authorization.replace("Bearer ", "");
  }
  // else if(req.cookies.token){
  //      token = req.cookies.token
  // }
  if (!token) {
    return next(new ErrorResponse("No token, access denied.", 403));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Invalid token.", 401));
  }
});

// Enable access for a given route depending on the user role (admin, user, publisher)
exports.authorize = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User with role "${req.user.role}" is not authorized to access this route.`,
          403
        )
      );
    }
    next();
  });
