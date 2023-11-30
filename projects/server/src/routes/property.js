const express = require("express");
const router = express.Router();
const { multerUpload } = require("../lib/multer");
const authMiddleware = require("../middleware/auth");
const propertyController = require("../controller/property");
const multer = require("multer");

router.post(
  "/create",
  multerUpload.array("images", 5),
  authMiddleware.validateToken,
  propertyController.createProperty
);

router.post(
  "/edit",
  multerUpload.array("images", 5),
  authMiddleware.validateToken,
  propertyController.editProperty
);

router.get(
  "/tenant",
  authMiddleware.validateToken,
  propertyController.getPropertiesByUserId
);

router.delete(
  "/delete/:id",
  authMiddleware.validateToken,
  propertyController.deletePropertyHandler
);

router.get("/", propertyController.getAllProperties);

module.exports = router;
