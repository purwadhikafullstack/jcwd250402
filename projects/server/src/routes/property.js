const express = require("express");
const router = express.Router();
const { multerUpload } = require("../lib/multer");
const authMiddleware = require("../middleware/auth");
const propertyController = require("../controller/property");
const multer = require("multer");

// POST
router.post(
  "/create",
  multerUpload.array("images", 5),
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  propertyController.createProperty
);

router.post(
  "/:propertyId/room/create",
  multerUpload.array("images", 5),
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  propertyController.createRoom
);

router.post("/view/:id", propertyController.incrementView);

// PUT / PATCH
router.patch(
  "/edit/:id",
  multerUpload.array("images", 5),
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  propertyController.editProperty
);

router.patch(
  "/edit/room/:roomId",
  multerUpload.single("image"),
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  propertyController.editRoom
);

// DELETE
router.delete(
  "/delete/:id",
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  propertyController.deletePropertyHandler
);

router.delete(
  "/:propertyId/room/delete/:roomId",
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  propertyController.deleteRoom
);

// GET
router.get("/", propertyController.getAllProperties);
router.get(
  "/tenant",
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  propertyController.getPropertiesByUserId
);

router.get(
  "/rooms-data/",
  authMiddleware.validateToken,
  propertyController.getAllRoomsAndProperties
);

router.get("/room/:id", propertyController.getRoomById);
router.get("/:id", propertyController.getPropertyById);

module.exports = router;
