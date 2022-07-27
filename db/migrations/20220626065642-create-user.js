'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(150),
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      recovery_token: {
        allowNull: true,
        type: DataTypes.STRING(150),
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING(20),
        defaultValue: 'customer',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  },
};
