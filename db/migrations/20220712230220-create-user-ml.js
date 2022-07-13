'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { USER_ML_TABLE } = require('./../models/userMl.model');
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_ML_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        field: 'user_id',
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
      mlUserId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'ml_user_id',
      },
      nickname: {
        allowNull: true,
        type: DataTypes.STRING(100),
      },
      accessToken: {
        allowNull: true,
        type: DataTypes.STRING(),
        field: 'access_token',
      },
      tokenType: {
        allowNull: true,
        type: DataTypes.STRING(20),
        field: 'token_type',
      },
      expiresIn: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'expires_in',
      },
      refreshToken: {
        allowNull: true,
        type: DataTypes.STRING(),
        field: 'refresh_token',
      },
      authMlToken: {
        unique: true,
        allowNull: true,
        type: DataTypes.STRING(),
        field: 'auth_ml_token',
      },
      endAt: {
        allowNull: true,
        type: DataTypes.DATE(),
        field: 'end_at',
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
    await queryInterface.dropTable(USER_ML_TABLE);
  },
};
