const User = require("../models/User");
const Post = require("../models/Post");
const CustomAPIError = require("../errors/custom-error");
const { registerValidator, loginValidator } = require("../validators/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { postValidator } = require("../validators/tasks");

const register = async (req, res) => {
  const { error } = registerValidator(req.body);
  if (error) {
    throw new CustomAPIError(error.details[0].message, 400);
  }
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json(user);
};

const login = async (req, res) => {
  const { error } = loginValidator(req.body);
  if (error) {
    throw new CustomAPIError(error.details[0].message, 400);
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "user not found" });
  }
  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass) {
    throw new CustomAPIError("Invalid Email or password", 400);
  }
  let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({
    userId: user._id,
    email: user.email,
    token: token,
  });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({ user_id: req.userId }).select(
    "post_title  post_description"
  );
  res.status(200).json(posts);
};

const createPost = async (req, res) => {
  console.log(typeof req.userId);
  const { error } = postValidator({
    user_id: req.userId,
    post_title: req.body.post_title,
    post_description: req.body.post_description,
  });
  if (error) {
    throw new CustomAPIError(error.details[0].message, 400);
  }
  const post = await Post.create({
    user_id: req.userId,
    post_title: req.body.post_title,
    post_description: req.body.post_description,
  });
  res.status(200).json(post);
};

module.exports = {
  login,
  getAllPosts,
  register,
  createPost,
};
