const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  loginValidator,
  registerValidator,
} = require("../validators/middlewares/user.validator");

router
  .route("/auth/register")
  .post(registerValidator, userController.registerUser);

router.route("/auth/login").post(loginValidator, userController.loginUser);

// Other routes
// router.route("/application/:id").delete(userController.deleteUser);
// router.route("/application/search").get(userController.searchUsers);

module.exports = router;
