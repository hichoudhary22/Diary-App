const express = require("express");
const userController = require("../controllers/userController");

router = express.Router();

router.route("/signup").post(userController.createNewUser);
router.route("/login").post(userController.login);
router.route("/logout").get(userController.logOut);
module.exports = router;
