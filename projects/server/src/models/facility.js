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
      Facility.belongsToMany(models.Property, {
        through: "PropertyFacility",
        foreignKey: "facilityId",
      });
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
      allowPets: DataTypes.BOOLEAN,
      allowSmoking: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Facility",
    }
  );
  return Facility;
};
