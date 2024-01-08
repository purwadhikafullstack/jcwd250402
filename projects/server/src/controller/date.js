const { Property, Rooms, SpecialDate, DisabledDates } = require("../models");

exports.createSpecialDate = async (req, res) => {
  const tenantId = req.user.id;
  const propertyId = req.params.propertyId;
  const roomId = req.params.roomId;
  const { startDate, endDate, price } = req.body;

  try {
    const property = await Property.findOne({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Property not found",
      });
    }

    if (tenantId !== property.userId) {
      return res.status(401).json({
        ok: false,
        status: 401,
        message: "Unauthorized",
      });
    }

    if (roomId) {
      const room = await Rooms.findOne({
        where: {
          id: roomId,
        },
      });

      const specialDate = await SpecialDate.create({
        startDate: startDate,
        endDate: endDate,
        price: price,
        propertyId: propertyId,
        roomId: roomId,
      });

      if (!specialDate) {
        return res.status(400).json({
          ok: false,
          status: 400,
          message: "Please fill all the fields",
        });
      }

      return res.status(201).json({
        ok: true,
        status: 201,
        message: "Special date successfully created",
        specialDate: specialDate,
      });
    }

    const specialDate = await SpecialDate.create({
      startDate: startDate,
      endDate: endDate,
      price: price,
      propertyId: propertyId,
    });

    if (!specialDate) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Please fill all the fields",
      });
    }

    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Special date successfully created",
      specialDate: specialDate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
  }
};

exports.getSpecialDates = async (req, res) => {
  const propertyId = req.params.propertyId;
  const roomId = req.params.roomId;

  try {
    if (roomId) {
      const specialDates = await SpecialDate.findAll({
        where: {
          propertyId: propertyId,
          roomId: roomId,
        },
      });

      if (!specialDates) {
        return res.status(404).json({
          ok: false,
          status: 404,
          message: "Special dates not found",
        });
      }

      return res.status(200).json({
        ok: true,
        status: 200,
        message: "Success",
        specialDates: specialDates,
      });
    }

    const specialDates = await SpecialDate.findAll({
      where: {
        propertyId: propertyId,
      },
    });

    if (!specialDates) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Special dates not found",
      });
    }

    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Success",
      specialDates: specialDates,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
  }
};

exports.setDateUnavailable = async (req, res) => {
  const tenantId = req.user.id;
  const propertyId = req.params.propertyId;
  const roomId = req.params.roomId;
  const { startDate, endDate, price } = req.body;

  try {
    const property = await Property.findOne({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Property Not Found",
      });
    }

    if (tenantId !== property.userId) {
      return res.status(403).json({
        ok: false,
        status: 403,
        message: "Unauthorized",
      });
    }

    if (roomId) {
      const disabledDate = await DisabledDates.create({
        startDate: startDate,
        endDate: endDate,
        propertyId: propertyId,
        roomId: roomId,
      });

      return res.status(201).json({
        ok: true,
        status: 201,
        message: "successfully set dates to disabled",
        disabledDate: disabledDate,
      });
    }

    const disabledDate = await DisabledDates.create({
      startDate: startDate,
      endDate: endDate,
      propertyId: propertyId,
    });

    if (!disabledDate) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "missing required fields",
      });
    }

    return res.status(201).json({
      ok: true,
      status: 201,
      message: "successfully set date disabled",
      disabledDate: disabledDate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};

exports.getDisabledDates = async (req, res) => {
  const propertyId = req.params.propertyId;
  const roomId = req.params.roomId;

  try {
    if (roomId) {
      const disabledDates = await DisabledDates.findAll({
        where: {
          propertyId: propertyId,
          roomId: roomId,
        },
      });
      return res.status(200).json({
        ok: true,
        status: 200,
        message: "Success",
        disabledDate: disabledDates,
      });
    }

    const disabledDates = await DisabledDates.findAll({
      where: {
        propertyId: propertyId,
      },
    });
    return res.status(200).json({
      ok: true,
      message: "success",
      disabledDates: disabledDates,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};

exports.getSpecialAndDisabledDates = async (req, res) => {
  const propertyId = req.params.propertyId;

  try {
    const specialDates = await SpecialDate.findAll({
      where: {
        propertyId: propertyId,
      },
    });

    const disabledDates = await DisabledDates.findAll({
      where: {
        propertyId: propertyId,
      },
    });

    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Success",
      specialDates: specialDates,
      disabledDates: disabledDates,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};

exports.clearSpecialDates = async (req, res) => {
  const propertyId = req.params.propertyId;
  const roomId = req.params.roomId;
  const userId = req.user.id;

  try {
    if (!userId) {
      res.status(401).json({
        ok: false,
        status: 401,
        message: "Unauthorized",
      });
    }

    const property = await Property.findOne({
      where: {
        id: propertyId,
        userId: userId,
      },
    });

    if (!property) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: "Property not found",
      });
    }

    if (userId !== property.userId) {
      return res.status(403).json({
        ok: false,
        status: 403,
        message: "Unauthorized",
      });
    }

    if (roomId) {
      const specialDates = await SpecialDate.destroy({
        where: {
          propertyId: propertyId,
          roomId: roomId,
        },
      });

      if (!specialDates) {
        res.status(404).json({
          ok: false,
          status: 404,
          message: "Special dates not found",
        });
      }

      return res.status(200).json({
        ok: true,
        status: 200,
        message: "Successfully cleared special dates",
      });
    }

    const specialDates = await SpecialDate.destroy({
      where: {
        propertyId: propertyId,
      },
    });

    if (!specialDates) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: "Special dates not found",
      });
    }

    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Successfully cleared special dates",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};

exports.clearDisabledDates = async (req, res) => {
  const propertyId = req.params.propertyId;
  const roomId = req.params.roomId;
  const userId = req.user.id;

  try {
    if (!userId) {
      res.status(401).json({
        ok: false,
        status: 401,
        message: "Unauthorized",
      });
    }

    const property = await Property.findOne({
      where: {
        id: propertyId,
        userId: userId,
      },
    });

    if (!property) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: "Property not found",
      });
    }

    if (userId !== property.userId) {
      return res.status(403).json({
        ok: false,
        status: 403,
        message: "Unauthorized",
      });
    }

    if (roomId) {
      const disabledDates = await DisabledDates.destroy({
        where: {
          propertyId: propertyId,
          roomId: roomId,
        },
      });

      if (!disabledDates) {
        res.status(404).json({
          ok: false,
          status: 404,
          message: "Disabled dates not found",
        });
      }

      return res.status(200).json({
        ok: true,
        status: 200,
        message: "Successfully cleared disabled dates",
      });
    }

    const disabledDates = await DisabledDates.destroy({
      where: {
        propertyId: propertyId,
      },
    });

    if (!disabledDates) {
      res.status(404).json({
        ok: false,
        status: 404,
        message: "Disabled dates not found",
      });
    }

    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Successfully cleared disabled dates",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};
