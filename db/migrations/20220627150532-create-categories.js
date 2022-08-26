'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      path_from_root: {
        type: DataTypes.ARRAY(Sequelize.JSONB),
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      settings: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      attributes: {
        type: DataTypes.ARRAY(Sequelize.JSONB),
        allowNull: true,
      },
      attributes_oblg: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      description_web: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE,
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
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
