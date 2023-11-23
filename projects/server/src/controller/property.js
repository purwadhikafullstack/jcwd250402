const {
  Property,
  PropertyImage,
  Category,
  PropertyRules,
  Amenity,
} = require("../models");

exports.createProperty = async (req, res) => {
  const {
    propertyName,
    description,
    price,
    bedCount,
    bedroomCount,
    maxGuestCount,
    bathroomCount,
    propertyType,
    district,
    city,
    province,
    streetAddress,
    postalCode,
    propertyRules,
    propertyAmenities,
  } = req.body;
  const images = req.files;

  if (!images) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Image(s) for the property are required",
    });
  }

  try {
    const imageObjects = images.map((image) => {
      return {
        image: image.filename,
        propertyId: null,
      };
    });

    const coverImage = imageObjects[0].image;
    const propertyImages = await PropertyImage.bulkCreate(imageObjects);
    const property = await Property.create(
      {
        propertyName,
        description,
        price,
        bedCount,
        bedroomCount,
        maxGuestCount,
        bathroomCount,
        coverImage: coverImage,
        userId: req.user.id,
        isActive: true,
        Categories: [
          {
            propertyType,
            district,
            city,
            province,
            streetAddress,
            postalCode,
          },
        ],
      },
      {
        include: [{ model: Category, as: "Categories" }],
      }
    );

    if (!property || !property.Categories || !images) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Please fill all the fields",
      });
    }

    await Promise.all(
      propertyImages.map((image) => image.update({ propertyId: property.id }))
    );

    if (propertyRules && propertyRules.length > 0) {
      const propertyRulesObjects = propertyRules.map((rule) => {
        return {
          rule,
          propertyId: property.id,
        };
      });
      await PropertyRules.bulkCreate(propertyRulesObjects);
    }

    if (propertyAmenities && propertyAmenities.length > 0) {
      const amenityObjects = propertyAmenities.map((amenity) => {
        return {
          amenity,
          propertyId: property.id,
        };
      });
      await Amenity.bulkCreate(amenityObjects);
    }

    return res.status(201).json({
      ok: true,
      status: 201,
      message: "Property successfully created",
      property: {
        id: property.id,
        name: property.name,
        description: property.description,
        price: property.price,
        address: property.address,
        coverImage: property.coverImage,
        userId: property.userId,
        propertyImages,
        Categories: property.Categories,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// masih error
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: PropertyImage,
          as: "propertyImages",
        },
        {
          model: Category,
          as: "Categories",
        },
      ],
    });

    const formattedProperties = properties.map((property) => {
      return {
        id: property.id,
        name: property.name,
        description: property.description,
        price: property.price,
        address: property.address,
        coverImage: property.coverImage,
        userId: property.userId,
        propertyImages: property.propertyImages,
        Categories: property.Categories,
      };
    });

    return res.status(200).json({
      ok: true,
      status: 200,
      properties: formattedProperties,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};
