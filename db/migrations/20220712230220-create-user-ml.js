'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { USER_ML_TABLE } = require('./../models/userMl.model');
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_ML_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: false,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nickname: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      access_token: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      token_type: {
        allowNull: true,
        type: DataTypes.STRING(20),
      },
      expires_in: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      scope: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      refresh_token: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      permalink: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      site_id: {
        allowNull: true,
        type: DataTypes.STRING(3),
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_ML_TABLE);
  },
};
