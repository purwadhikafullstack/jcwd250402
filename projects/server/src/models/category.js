"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Property, {
        through: "PropertyCategory",
        foreignKey: "categoryId",
        as: "Categories",
      });
    }
  }
  Category.init(
    {
      propertyType: DataTypes.ENUM(
        "house",
        "apartment",
        "villa",
        "hotel",
        "room"
      ),
      district: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      province: { type: DataTypes.STRING, allowNull: false },
      streetAddress: { type: DataTypes.STRING, allowNull: false },
      postalCode: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
