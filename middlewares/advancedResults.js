const asyncHandler = require("../middlewares/async");

const advancedResults = (model, populate) =>
  asyncHandler(async (req, res, next) => {
    let query;
    let queryStr = JSON.stringify(req.query).replace(
      /\b(lt|lte|in|gte|gt)\b/gi,
      (param) => `$${param}`
    );
    queryStr = JSON.parse(queryStr);

    const fieldsToRemove = ["page", "limit", "select", "sort"];

    //  Make queryStr a valid mongoose query
    fieldsToRemove.forEach((field) => delete queryStr[field]);

    // Execute query
    query = model.find(queryStr);

    // Check if more filters were provided to update initial query
    const { page, limit, select, sort } = req.query;

    if (select) {
      // Convert from csv to ssv to make it a valid mongoose query
      const fieldsToSelect = select.split(",").join(" ");
      query = query.select(fieldsToSelect);
    }

    if (sort) {
      const sortBy = sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    const currentPage = parseInt(page, 10) || 1;
    const limitBy = parseInt(limit, 10) || 25;
    const startIndex = (currentPage - 1) * limitBy;
    const endIndex = currentPage * limitBy;
    const total = await model.countDocuments(queryStr);

    query = query.skip(startIndex).limit(limitBy);

    let pagination = { total, limit: limitBy };

    // Check if still can go backwards
    if (startIndex > 0) {
      pagination.prev = {
        page: currentPage - 1,
      };
    }

    // Check if still can go forward
    if (endIndex < total) {
      pagination.next = {
        page: currentPage + 1,
      };
    }

    // Populate additional fields if provided
    if (populate) {
      query = query.populate(populate);
    }

    const results = await query;

    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };

    next();
  });

module.exports = advancedResults;
