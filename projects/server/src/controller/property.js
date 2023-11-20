const { Property, PropertyImage } = require("../models");

exports.createProperty = async (req, res) => {
  const {
    propertyName,
    description,
    price,
    roomCount,
    bedCount,
    maxGuestCount,
    bathroomCount,
    address,
    propertyCategory,
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
    // Create PropertyImages
    const imageObjects = images.map((image) => {
      return {
        image: image.filename,
        propertyId: null, // Initialize propertyId to null
      };
    });

    const coverImage = imageObjects[0].image;

    const propertyImages = await PropertyImage.bulkCreate(imageObjects);

    // Create Property with associations
    const property = await Property.create({
      propertyName,
      description,
      price,
      roomCount,
      bedCount,
      maxGuestCount,
      bathroomCount,
      address,
      propertyCategory,
      coverImage: coverImage,
      userId: req.user.id,
    });

    // Update the propertyId for each PropertyImage
    await Promise.all(
      propertyImages.map((image) => image.update({ propertyId: property.id }))
    );

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
