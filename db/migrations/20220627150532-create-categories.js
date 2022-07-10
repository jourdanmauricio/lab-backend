'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mlId: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: true,
        field: 'ml_id',
      },
      name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        field: 'full_name',
      },
      pathFromRoot: {
        type: DataTypes.ARRAY(Sequelize.JSONB),
        allowNull: true,
        field: 'path_from_root',
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
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
