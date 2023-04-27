'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('drone', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      serial_number: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      battery_capacity: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      state: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
