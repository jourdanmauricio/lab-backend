'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./../models/customer.model');
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      last_name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      document_type: {
        allowNull: true,
        type: DataTypes.STRING(20),
      },
      document_number: {
        allowNull: true,
        type: DataTypes.STRING(20),
      },
      user_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
