const { Op } = require("sequelize");
const { Property, Category, Booking } = require("../models");

exports.searchHandler = async (req, res) => {
  try {
    const {
      country,
      startDate,
      endDate,
      guestCount,
      roomCount,
      bathroomCount,
    } = req.query;

    const propertyWhereClause = {};
    if (guestCount)
      propertyWhereClause.maxGuestCount = { [Op.gte]: guestCount };
    if (roomCount) propertyWhereClause.bedroomCount = { [Op.gte]: roomCount };
    if (bathroomCount)
      propertyWhereClause.bathroomCount = { [Op.gte]: bathroomCount };

    const include = [];
    if (country) {
      include.push({
        model: Category,
        through: "PropertyCategory",
        as: "Categories",
        where: { Country: country },
      });
    }

    const properties = await Property.findAll({
      include: include,
      where: propertyWhereClause,
    });

    const availableProperties = await Promise.all(
      properties.map(async (property) => {
        const bookingWhereClause = { propertyId: property.id };
        if (startDate && endDate) {
          bookingWhereClause[Op.or] = [
            {
              startDate: {
                [Op.between]: [startDate, endDate],
              },
            },
            {
              endDate: {
                [Op.between]: [startDate, endDate],
              },
            },
            {
              [Op.and]: [
                { startDate: { [Op.lte]: startDate } },
                { endDate: { [Op.gte]: endDate } },
              ],
            },
          ];
        }

        const bookings = await Booking.findAll({
          where: bookingWhereClause,
        });

        return {
          ...property.dataValues,
          isAvailable: bookings.length === 0,
        };
      })
    );

    return res.status(200).json({
      ok: true,
      status: 200,
      availableProperties: availableProperties.filter(
        (property) => property.isAvailable
      ),
    });
  } catch (error) {
    console.error("Error in searchHandler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
