"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Property, {
        foreignKey: "propertyId",
      });
      Review.belongsTo(models.User, {
        foreignKey: "renterId",
        as: "renter",
      });
      Review.belongsTo(models.User, {
        foreignKey: "tenantId",
        as: "tenant",
      });
    }
  }
  Review.init(
    {
      comment: DataTypes.TEXT,
      rating: { type: DataTypes.INTEGER, allowNull: false },
      propertyId: { type: DataTypes.INTEGER, allowNull: false },
      renterId: { type: DataTypes.INTEGER, allowNull: false },
      tenantId: { type: DataTypes.INTEGER, allowNull: false },
      bookingId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
