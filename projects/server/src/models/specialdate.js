"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SpecialDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpecialDate.belongsTo(models.Property, {
        foreignKey: "propertyId",
        as: "specialDates",
      });
      SpecialDate.belongsTo(models.Rooms, {
        foreignKey: "roomId",
        as: "room",
      });
    }
  }
  SpecialDate.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      propertyId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SpecialDate",
    }
  );
  return SpecialDate;
};
