const { body, validationResult } = require("express-validator");

exports.registerValidationRules = [
  body("fullname")
    .isLength({ min: 5 })
    .withMessage("Fullname must be at least 5 chars long"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .matches(/^[a-zA-Z0-9\s_!@#$%^&*()-+=|\\{}:;/,.?"]*$/)
    .withMessage(
      "Password must contain at least one letter, number, or special character"
    ),
  body("phoneNumber")
    .isMobilePhone("id-ID")
    .withMessage("Please provide a valid phone number"),
];
exports.tenantRegisterRules = [
  body("fullname")
    .isLength({ min: 5 })
    .withMessage("Fullname must be at least 5 chars long"),
  body("username")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 chars long"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .matches(/^[a-zA-Z0-9\s_!@#$%^&*()-+=|\\{}:;/,.?"]*$/)
    .withMessage(
      "Password must contain at least one letter, number, or special character"
    ),
  body("phoneNumber")
    .isMobilePhone("id-ID")
    .withMessage("Please provide a valid phone number"),
];

exports.newPasswordRules = [
  // Untuk change-password dan reset-password
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .matches(/^[a-zA-Z0-9\s_!@#$%^&*()-+=|\\{}:;/,.?"]*$/)
    .withMessage(
      "Password must contain at least one letter, number, or special character"
    ),
];

exports.applyRegisterValidation = [
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({
        ok: false,
        message: "Invalid data input",
        errors: result.errors,
      });
      return;
    }
    next();
  },
];
