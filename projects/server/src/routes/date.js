const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const dateController = require("../controller/date");

router.post(
  "/special/create/:propertyId",
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  dateController.createSpecialDate
);
router.post(
  "/disabled/create/:propertyId",
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  dateController.setDateUnavailable
);

router.get("/:propertyId", dateController.getSpecialAndDisabledDates);
router.get("/special/:propertyId", dateController.getSpecialDates);
router.get("/disabled/:propertyId", dateController.getDisabledDates);

router.delete(
  "/disabled/delete/:propertyId/:roomId?",
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  dateController.clearDisabledDates
);
router.delete(
  "/special/delete/:propertyId/:roomId?",
  authMiddleware.validateToken,
  authMiddleware.checkTenant,
  dateController.clearSpecialDates
);

module.exports = router;
