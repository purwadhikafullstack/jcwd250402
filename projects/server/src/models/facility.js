"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Facility.init(
    {
      sheets: DataTypes.BOOLEAN,
      airConditioning: DataTypes.BOOLEAN,
      cookingBasics: DataTypes.BOOLEAN,
      silverwares: DataTypes.BOOLEAN,
      hairdryer: DataTypes.BOOLEAN,
      kitchen: DataTypes.BOOLEAN,
      tv: DataTypes.BOOLEAN,
      washer: DataTypes.BOOLEAN,
      wifi: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Facility",
    }
  );
  return Facility;
};
