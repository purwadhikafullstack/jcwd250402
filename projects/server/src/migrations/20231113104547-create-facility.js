"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Facilities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      propertyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Properties",
          key: "id",
        },
      },
      sheets: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      airConditioning: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      cookingBasics: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      silverwares: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      hairdryer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      kitchen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      tv: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      washer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      wifi: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      allowPets: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      allowSmoking: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Facilities");
  },
};
