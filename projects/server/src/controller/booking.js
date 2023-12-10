const { Booking, Property, User } = require("../models");

exports.createBooking = async (req, res) => {
  const renterId = req.user.id;
  const { tenantId, propertyId, startDate, endDate, guestCount, totalPrice } =
    req.body;

  try {
    if (
      !renterId ||
      !tenantId ||
      !propertyId ||
      !startDate ||
      !endDate ||
      !guestCount ||
      !totalPrice
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (renterId === tenantId) {
      return res
        .status(400)
        .json({ message: "Renter and tenant cannot be the same" });
    }
    const booking = await Booking.create(
      {
        renterId,
        tenantId,
        propertyId,
        startDate,
        endDate,
        guestCount,
        totalPrice,
        status: "pending payment",
      },
      {
        include: [{ model: Property, as: "property" }],
      },
      {
        include: [{ model: User, as: "renter" }],
      }
    );

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getNewBooking = async (req, res) => {
  const tenantId = req.user.id;
  try {
    const booking = await Booking.findAll({
      include: [
        { model: Property, as: "property" },
        { model: User, as: "renter" },
      ],
      where: {
        tenantId: tenantId,
      },
    });
    res.status(200).json({ message: "Success", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
