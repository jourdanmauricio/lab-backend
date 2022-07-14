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
        type: DataTypes.STRING(),
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
      scope: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      refreshToken: {
        allowNull: true,
        type: DataTypes.STRING(),
        field: 'refresh_token',
      },
      endAt: {
        allowNull: true,
        type: DataTypes.DATE(),
        field: 'end_at',
      },
      address: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      buyerReputation: {
        allowNull: true,
        type: DataTypes.JSONB,
        field: 'buyer_reputation',
      },
      company: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      countryId: {
        allowNull: true,
        type: DataTypes.STRING(10),
        field: 'country_id',
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      firstName: {
        allowNull: true,
        type: DataTypes.STRING(),
        field: 'first_name',
      },
      gender: {
        allowNull: true,
        type: DataTypes.STRING(1),
      },
      identification: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING(),
        field: 'last_name',
      },
      logo: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      permalink: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      phone: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      sellerReputation: {
        allowNull: true,
        type: DataTypes.JSONB,
        field: 'seller_reputation',
      },
      siteId: {
        allowNull: true,
        type: DataTypes.STRING(3),
        field: 'site_id',
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
