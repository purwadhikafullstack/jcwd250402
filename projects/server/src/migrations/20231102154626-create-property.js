"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("properties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      propertyName: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      bedCount: {
        type: Sequelize.INTEGER,
      },
      bedroomCount: {
        type: Sequelize.INTEGER,
      },
      maxGuestCount: {
        type: Sequelize.INTEGER,
      },
      bathroomCount: {
        type: Sequelize.INTEGER,
      },
      viewCount: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      coverImage: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("properties");
  },
};
