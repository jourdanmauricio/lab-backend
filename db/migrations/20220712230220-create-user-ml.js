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
      ml_user_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
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
      end_at: {
        allowNull: true,
        type: DataTypes.DATE(),
      },
      address: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      buyer_reputation: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      company: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      country_id: {
        allowNull: true,
        type: DataTypes.STRING(10),
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      first_name: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      gender: {
        allowNull: true,
        type: DataTypes.STRING(1),
      },
      identification: {
        allowNull: true,
        type: DataTypes.JSONB,
      },
      last_name: {
        allowNull: true,
        type: DataTypes.STRING(),
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
      seller_reputation: {
        allowNull: true,
        type: DataTypes.JSONB,
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
