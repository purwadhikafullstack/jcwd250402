"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Property.hasMany(models.PropertyImage, {
        foreignKey: "propertyId",
        as: "propertyImages",
      });
      Property.belongsTo(models.User, {
        foreignKey: "userId",
        as: "tenant",
      });
      // Property.belongsTo(models.PropertyAmenity, {
      //   foreignKey: "amenityId",
      //   as: "amenity",
      // });
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      roomCount: DataTypes.INTEGER,
      maxGuestCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};
