const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    throw new CustomAPIError("Unauthorized", 401);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = verified._id;
  next();
};

module.exports = {
  auth,
};
