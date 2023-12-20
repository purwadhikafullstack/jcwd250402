const { Review, User, Property, Booking } = require("../models");

exports.createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { comment, rating, bookingId } = req.body;

    const booking = await Booking.findByPk(bookingId);
    const renterId = booking.renterId;
    const propertyId = booking.propertyId;
    const tenantId = booking.tenantId;

    if (userId !== renterId) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "You are not authorized to perform this action",
      });
    }

    if (userId === tenantId) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "You are not allowed to review your own property",
      });
    }

    if (booking.status !== "completed") {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Booking is not completed",
      });
    }

    if (new Date() < booking.endDate) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Booking has not yet ended",
      });
    }

    if (!rating || !comment) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Please provide a valid review",
      });
    }

    const review = await Review.create({
      comment,
      rating,
      propertyId,
      renterId,
      tenantId,
      bookingId,
    });

    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal server error",
    });
  }
};

exports.getAllReviewByPropertyId = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const reviews = await Review.findAll({
      where: {
        propertyId,
      },
      include: [
        { model: User, as: "renter" },
        { model: User, as: "tenant" },
      ],
    });
    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal server error",
    });
  }
};
