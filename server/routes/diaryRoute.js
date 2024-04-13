const express = require("express");
const diaryController = require("../controllers/diaryController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.authorised, diaryController.allEntries)
  .delete(authController.authorised, diaryController.deleteEntry)
  .put(authController.authorised, diaryController.modifyEntry);

router
  .route("/newEntry")
  .post(authController.authorised, diaryController.newEntry);

module.exports = router;
