"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DisabledDates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DisabledDates.belongsTo(models.Property, {
        foreignKey: "propertyId",
        as: "disabledDates",
      });
      DisabledDates.belongsTo(models.Rooms, {
        foreignKey: "roomId",
        as: "room",
      });
    }
  }
  DisabledDates.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      propertyId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DisabledDates",
    }
  );
  return DisabledDates;
};
