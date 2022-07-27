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
        type: DataTypes.STRING(20),
      },
      prod_id: {
        type: DataTypes.INTEGER,
        references: { model: PRODUCT_TABLE, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      seller_custom_field: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      available_quantity: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM(
          'pending',
          'under_review',
          'inactive',
          'active',
          'paused',
          'closed'
        ),
        allowNull: false,
      },
      start_time: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
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
    await queryInterface.dropTable(PRODUCT_ML_TABLE);
    await queryInterface.Sequelize.query(
      'DROP TYPE IF EXISTS enum_products_ml_status'
    );
  },
};
