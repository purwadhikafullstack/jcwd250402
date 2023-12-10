const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const bookingController = require("../controller/booking");

router.post(
  "/new",
  authMiddleware.validateToken,
  bookingController.createBooking
);

router.get("/", authMiddleware.validateToken, bookingController.getNewBooking);

module.exports = router;
