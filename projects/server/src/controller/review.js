const { Review, User, Property, Booking } = require("../models");
const { Op } = require("sequelize");

exports.createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.id;
    const { comment, rating } = req.body;

    const booking = await Booking.findByPk(bookingId);
    const renterId = booking.renterId;
    const tenantId = booking.tenantId;
    const propertyId = booking.propertyId;

    const existingReview = await Review.findOne({
      attributes: ["id"],
      where: {
        bookingId: bookingId,
        renterId: renterId,
      },
    });

    if (existingReview) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "You have already reviewed this booking",
      });
    }

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
      comment: comment,
      rating: rating,
      propertyId: propertyId,
      bookingId: bookingId,
      renterId: renterId,
      tenantId: tenantId,
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
  const propertyId = req.params.id;
  try {
    const reviews = await Review.findAll({
      where: {
        propertyId,
      },
      include: [
        {
          model: User,
          as: "renter",
          attributes: ["id", "fullname", "email", "profilePicture"],
        },
        {
          model: User,
          as: "tenant",
          attributes: ["id", "fullname", "email", "profilePicture"],
        },
      ],
      attributes: ["id", "comment", "rating", "createdAt"],
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
