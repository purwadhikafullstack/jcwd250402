"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Amenity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Amenity.belongsTo(models.Property, {
        foreignKey: "propertyId",
      });
    }
  }
  Amenity.init(
    {
      propertyId: { type: DataTypes.INTEGER, allowNull: false },
      amenity: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Amenity",
    }
  );
  return Amenity;
};
