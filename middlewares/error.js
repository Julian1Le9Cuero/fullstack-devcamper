const ErrorResponse = require("../utils/errorResponse");

const error = (err, req, res, next) => {
  let error = { err };
  error.message = err.message;
  let message;

  console.log(err);
  console.log(err.kind);

  if (err.code === 11000) {
    message = "Duplicated field entered.";
    error = new ErrorResponse(message, 400);
  }

  if (err.errors) {
    message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  if (err.kind === "ObjectId") {
    message = "Resource not found.";
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server error.",
  });
};

module.exports = error;
