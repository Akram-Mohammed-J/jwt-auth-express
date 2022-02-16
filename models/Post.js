const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  post_title: {
    type: String,
    required: true,
    min: [6, "post title must be atleast 6 characters"],
  },
  post_description: {
    type: String,
    required: true,
    min: [10, "post description must be atleast 10 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("post", PostSchema);
