'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { PRODUCT_ML_TABLE } = require('./../models/productMl.model');
const { PRODUCT_TABLE } = require('./../models/product.model');
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PRODUCT_ML_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      prodId: {
        type: DataTypes.INTEGER,
        references: { model: PRODUCT_TABLE, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        field: 'prod_id',
      },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM('pending', 'active', 'paused', 'closed'),
        allowNull: false,
      },
      startTime: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'start_time',
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(PRODUCT_ML_TABLE);
  },
};
