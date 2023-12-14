"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PropertyImage.belongsTo(models.Property, {
        foreignKey: "propertyId",
        as: "PropertyImages",
      });
    }
  }
  PropertyImage.init(
    {
      propertyId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PropertyImage",
    }
  );
  return PropertyImage;
};
