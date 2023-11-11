const express = require("express");
const router = express.Router();

// untuk uoload gambar
const { multerUpload } = require("../lib/multer");
const authController = require("../controller/auth");
const authValidator = require("../middleware/validation/auth");
const authMiddleware = require("../middleware/auth");

router.post(
  "/register",
  authValidator.registerValidationRules,
  authValidator.applyRegisterValidation,
  authController.handleRegister
);

router.post("/forgot-password", authController.forgotPassword);

router.patch(
  "/reset-password/:token",
  // authValidator.newPasswordRules,
  // authValidator.applyRegisterValidation,
  authController.resetPassword
);

router.patch(
  "/change-password",
  authMiddleware.validateToken,
  // authValidator.newPasswordRules,
  // authValidator.applyRegisterValidation,
  authController.changePassword
);

router.get("/verify-email", authController.handleVerifyEmail);

router.post("/login", authController.loginHandler);

module.exports = router;
// Compare this snippet from projects/server/src/controller/auth.js:
