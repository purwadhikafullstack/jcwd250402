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
      // Property.hasMany(models.Room, {
      //   foreignKey: "propertyId",
      // });
      // Property.hasMany(models.ProperyImage, {
      //   foreignKey: "propertyId",
      // });
      // Property.belongsTo(models.Category, {
      //   foreignKey: "categoryId",
      // });
      // Property.belongsTo(models.User, {
      //   foreignKey: "userId",
      // });
      // Property.hasMany(models.Review, {
      //   foreignKey: "propertyId",
      // });
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};
