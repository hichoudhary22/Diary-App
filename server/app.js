//here all the middlewares and all the routes are configured.

const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const diaryRoute = require("./routes/diaryRoute");

app = express();

app.use(
  cors({
    credentials: "include",
    origin: "https://diary-app-4ipf.onrender.com",
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/diary", diaryRoute);
app.use("*", (req, res, next) => {
  res.status(400).json({ message: "route doesn't exist" });
});

app.use((err, req, res, next) => {
  console.log("central error handling");
  console.log(err.message);
  res.status(400).json({
    message: err.message,
  });
});

module.exports = app;
