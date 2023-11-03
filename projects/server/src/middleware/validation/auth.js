const { body, validationResult } = require("express-validator");

exports.registerValidationRules = [
  body("fullname")
    .isLength({ min: 5 })
    .withMessage("Fullname must be at least 5 chars long"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .notEmpty()
    .isStrongPassword({
      minLength: 5,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be at least 5 chars long, contain at least 1 number, and 1 uppercase letter"
    ),
  body("phoneNumber")
    .isMobilePhone("id-ID")
    .withMessage("Please provide a valid phone number"),
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
