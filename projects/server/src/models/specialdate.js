'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  specialDate.init({
    date: DataTypes.DATE,
    isBooked: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'specialDate',
  });
  return specialDate;
};