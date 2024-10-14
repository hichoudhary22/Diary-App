const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { secretToken } = require("../utils/SecretToken");
const { catchAsyncError } = require("../utils/errorHandler");
const diaryModel = require("../models/diaryModel");

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
  if (!user)
    return next({ status: 401, message: `No User found with ${email}` });

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) return next(Error("incorrect password"));

  // sending diary data with login success
  const diaryEntries = await diaryModel.find({ userId: user._id });

  const token = secretToken(user._id);
  res.cookie("token", token, {
    withCredentials: true,
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });

  res.status(200).json({
    userId: user._id,
    userName: user.name,
    userEmail: user.email,
    noOfEntries: diaryEntries.length,
    diaryEntries,
  });
};

exports.logOut = async (req, res, next) => {
  res.cookie("token", "none", {
    withCredentials: true,
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ message: "log out succesful" });
};
