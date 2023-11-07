const express = require("express");
const router = express.Router();

// untuk uoload gambar
const { multerUpload } = require("../lib/multer");

const authController = require("../controller/auth");
const authValidator = require("../middleware/validation/auth");

router.post(
  "/register",
  authValidator.registerValidationRules,
  authValidator.applyRegisterValidation,
  authController.handleRegister
);

router.post("/login", authController.loginHandler);

module.exports = router;
// Compare this snippet from projects/server/src/controller/auth.js:
