//here all the middlewares and all the routes are configured.

const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const diaryRoute = require("./routes/diaryRoute");
require("dotenv").config();

app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/diary", diaryRoute);
app.use("*", (req, res, next) => {
  res.status(404).json({ message: "route doesn't exist" });
});

app.use((error, req, res, next) => {
  // console.log(error);
  res.status(error.status).json({
    message: error.message,
  });
});

module.exports = app;
