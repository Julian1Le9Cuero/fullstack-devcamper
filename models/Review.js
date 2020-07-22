const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title for the review"],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "The description cannot be more than 500 characters"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"],
  },
  bootcamp: {
    type: mongoose.Types.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// One review for a bootcamp per user
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Calculate average rating for bootcamp
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  try {
    const obj = await this.aggregate([
      {
        $match: { bootcamp: bootcampId },
      },
      {
        $group: {
          _id: "$bootcamp",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (obj.length === 0) {
      await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
        averageRating: undefined,
      });
      return;
    }

    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageRating: Math.round(parseFloat(obj[0].averageRating)),
    });
  } catch (error) {
    console.error(error);
  }
};

ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.bootcamp);
});

ReviewSchema.post("remove", function () {
  this.constructor.getAverageRating(this.bootcamp);
});

module.exports = Review = mongoose.model("Review", ReviewSchema);
