"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyRules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PropertyRules.belongsTo(models.Property, {
        foreignKey: "propertyId",
        as: "PropertyRules",
      });
    }
  }
  PropertyRules.init(
    {
      rule: { type: DataTypes.STRING, allowNull: false },
      propertyId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "PropertyRules",
    }
  );
  return PropertyRules;
};
