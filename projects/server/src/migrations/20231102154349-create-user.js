"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
      },
      dateofbirth: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      role: {
        type: Sequelize.ENUM("user", "tenant"),
      },
      ktpImg: {
        type: Sequelize.STRING,
      },
      verifyToken: {
        type: Sequelize.STRING,
      },
      verifyTokenExpiry: {
        type: Sequelize.DATE,
      },
      resetToken: {
        type: Sequelize.STRING,
      },
      resetTokenExpiry: {
        type: Sequelize.DATE,
      },
      passwordUpdatedAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("users");
  },
};
