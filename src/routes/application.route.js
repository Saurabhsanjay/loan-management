const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application.controller");
const authMiddleware = require("../middlewares/auth-middleware");
const applicationValidator = require("../validators/middlewares/application.validator");

router
  .route("/application")
  .post(applicationValidator, applicationController.createApplication)
  .get(authMiddleware, applicationController.getApplications);

// router.route("/application/:id").delete(applicationController.deleteUser);
// router.route("/application/search").get(applicationController.searchUsers);
module.exports = router;
