const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const reviewController = require("../controller/review");

router.post(
  "/create",
  authMiddleware.validateToken,
  reviewController.createReview
);

router.get("/:id", reviewController.getAllReviewByPropertyId);

module.exports = router;
