const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const authValidator = require("../middleware/validation/auth");

router.post("/forgot-password", userController.forgotPassword);
router.patch(
  "/reset-password/:token",
  // authValidator.newPasswordRules,
  // authValidator.applyRegisterValidation,
  userController.resetPassword
);

module.exports = router;
