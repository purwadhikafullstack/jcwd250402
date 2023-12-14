"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PropertyCategory.belongsTo(models.Property, {
        foreignKey: "propertyId",
      });
      PropertyCategory.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }
  }
  PropertyCategory.init(
    {
      propertyId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PropertyCategory",
    }
  );
  return PropertyCategory;
};
