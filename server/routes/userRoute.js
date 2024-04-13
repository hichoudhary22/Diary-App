const express = require("express");
const userController = require("../controllers/userController");

router = express.Router();

router.route("/signUp").post(userController.createNewUser);
router.route("/login").post(userController.login);
router.route("/logOut").get(userController.logOut);
module.exports = router;
