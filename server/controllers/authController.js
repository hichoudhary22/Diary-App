const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.authorised = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json("no cookie found please login");
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      res.status(400).json("jwt verification failed");
    } else {
      const user = await userModel.findById(data.id);
      req.user = user;
      next();
    }
  });
};
