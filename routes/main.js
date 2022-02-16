const express = require("express");
const {
  login,
  getAllPosts,
  register,
  createPost,
} = require("../controllers/main");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/posts", auth, getAllPosts);
router.post("/post", auth, createPost);
module.exports = router;
