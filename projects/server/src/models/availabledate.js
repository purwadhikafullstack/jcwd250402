"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AvailableDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AvailableDate.init(
    {
      date: DataTypes.DATE,
      isBooked: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AvailableDate",
    }
  );
  return AvailableDate;
};
