const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

const checkOwnership = (model) =>
  asyncHandler(async (req, res, next) => {
    const resource = await model.findById(req.params.id);

    // Check if resource exists
    if (!resource) {
      return next(
        new ErrorResponse(`Resource not found with id ${req.params.id}.`, 404)
      );
    }

    // Check if the logged in user is an admin or is the owner of the resource
    if (req.user.id !== resource.user.toString() && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} with role '${req.user.role}' is not authorized to modify this resource.`,
          403
        )
      );
    }

    res.resource = resource;

    next();
  });

module.exports = checkOwnership;
