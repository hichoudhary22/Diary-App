const express = require("express");
const diaryController = require("../controllers/diaryController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.authorised, diaryController.allEntries)
  .post(authController.authorised, diaryController.newEntry)
  .put(authController.authorised, diaryController.modifyEntry)
  .delete(authController.authorised, diaryController.deleteEntry);

module.exports = router;
