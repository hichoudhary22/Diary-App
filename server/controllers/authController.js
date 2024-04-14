const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.authorised = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) next(Error("no cookie found please login"));

  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      res.cookie("token", "none", {
        withCredentials: true,
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
      });
      next(Error("jwt verification failed please login again"));
    } else {
      const user = await userModel.findById(data.id);
      req.user = user;
      next();
    }
  });
};
