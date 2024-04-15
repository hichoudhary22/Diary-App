const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { secretToken } = require("../utils/SecretToken");
const { catchAsyncError } = require("../utils/errorHandler");

exports.createNewUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser)
    return next(Error("user already exist, please use login page"));

  const newUser = await userModel.create({
    name,
    email,
    password,
  });
  const token = secretToken(newUser._id);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });

  res.status(200).json({
    message: `Hello ${newUser.name}, welcome to our diary app`,
    user: newUser,
  });
});

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return next(Error("user not found! Please Login..."));

  const auth = await bcrypt.compare(password, user.password);

  if (!auth) return next(Error("incorrect password"));

  const token = secretToken(user._id);
  res.cookie("token", token, {
    withCredentials: true,
    sameSite: "none",
    secure: true,
    // httpOnly: true,
  });
  res.status(200).json({ message: `login succesful ${user.name}` });
};

exports.logOut = async (req, res, next) => {
  res.cookie("token", "none", {
    withCredentials: true,
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ message: "log out succesful" });
};
