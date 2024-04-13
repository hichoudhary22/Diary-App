const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const { secretToken } = require("../utils/SecretToken");

exports.createNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "user already exist, please use login page" });
  }
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
  next();
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.send("user unavailable");
  }
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    return res.send("password is incorrect");
  }
  const token = secretToken(user._id);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: true,
  });
  res.status(200).json({ message: `login succesful ${user.name}`, token });
  next();
};

exports.logOut = async (req, res, next) => {
  res.cookie("token", "none", {
    withCredentials: true,
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ message: "log out succesful" });
};
