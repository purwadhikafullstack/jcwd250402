const {
  Property,
  PropertyImage,
  Category,
  PropertyRules,
  Amenity,
} = require("../models");

exports.createProperty = async (req, res) => {
  try {
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

    if (!images || images.length === 0) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Image(s) for the property are required",
      });
    }

    const imageObjects = images.map((image) => ({
      image: image.filename,
    }));

    if (!imageObjects || imageObjects.length === 0) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "No valid images provided",
      });
    }

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

    if (!property || !property.Categories) {
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
      const propertyRulesObjects = propertyRules.map((rule) => ({
        rule,
        propertyId: property.id,
      }));
      await PropertyRules.bulkCreate(propertyRulesObjects);
    }

    if (propertyAmenities && propertyAmenities.length > 0) {
      const amenityObjects = propertyAmenities.map((amenity) => ({
        amenity,
        propertyId: property.id,
      }));
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
    console.error("Server error:", error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
};

exports.getAllProperties = async (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort;
  const category = req.query.category;
  const search = req.query.search;
  const filterBy = req.query.filterBy;
  const isActive = req.query.isActive || false;

  try {
    const properties = await Property.findAll({
      include: [
        {
          model: PropertyImage,
          as: "PropertyImages",
          attributes: ["id", "image"],
        },
        {
          model: PropertyRules,
          as: "PropertyRules",
          attributes: ["id", "rule"],
        },
        {
          model: Amenity,
          as: "Amenities",
          attributes: ["id", "amenity"],
        },
        {
          model: Category,
          as: "Categories",
          attributes: [
            "propertyType",
            "district",
            "city",
            "province",
            "streetAddress",
            "postalCode",
          ],
          through: { attributes: [] },
        },
      ],
      attributes: [
        "id",
        "propertyName",
        "description",
        "price",
        "bedCount",
        "bedroomCount",
        "maxGuestCount",
        "bathroomCount",
        "coverImage",
        "userId",
        "isActive",
      ],
      where: {},
    });

    if (!properties || properties.length === 0) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "No properties found",
      });
    }

    const formattedProperties = properties.map((property) => {
      return {
        id: property.id,
        userId: property.userId,
        name: property.propertyName,
        description: property.description,
        bedCount: property.bedCount,
        bedroomCount: property.bedroomCount,
        maxGuestCount: property.maxGuestCount,
        bathroomCount: property.bathroomCount,
        price: property.price,
        coverImage: property.coverImage,
        categories: property.Categories.map((category) => ({
          id: category.id,
          propertyType: category.propertyType,
          district: category.district,
          city: category.city,
          province: category.province,
          streetAddress: category.streetAddress,
          postalCode: category.postalCode,
        })),
        amenities: property.Amenities.map((amenity) => ({
          id: amenity.id,
          amenity: amenity.amenity,
        })),
        propertyImages: property.PropertyImages.map((image) => ({
          id: image.id,
          image: image.image,
        })),
        propertyRules: property.PropertyRules.map((rule) => ({
          id: rule.id,
          rule: rule.rule,
        })),
      };
    });

    return res.status(200).json({
      ok: true,
      status: 200,
      Properties: formattedProperties,
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
