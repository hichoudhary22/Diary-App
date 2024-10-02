const express = require("express");
const userController = require("../controllers/userController");

router = express.Router();

router.route("/signup").post(userController.createNewUser);
router.route("/login").post(userController.login);
router.route("/logout").get(userController.logOut);
router.route("/check-auth").get(userController.checkAuth);
module.exports = router;
