/*
in this file we connect to database using mongoose and listen to requests on a defined port using express
*/
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const uri = process.env.MONGO_DB_SERVER.replace(
  "<userName>",
  process.env.USER_NAME
).replace("<password>", process.env.PASSWORD);

mongoose
  .connect(uri)
  .then(() => {
    console.log("successfully connected to Database");
  })
  .catch((er) => {
    console.log(er);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
