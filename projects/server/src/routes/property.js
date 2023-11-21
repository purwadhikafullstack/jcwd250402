const express = require("express");
const router = express.Router();
const { multerUpload } = require("../lib/multer");
const authMiddleware = require("../middleware/auth");
const propertyController = require("../controller/property");

router.post(
  "/create",
  multerUpload.array("images", 5),
  authMiddleware.validateToken,
  propertyController.createProperty
);

module.exports = router;
