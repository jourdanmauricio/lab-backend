'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./../models/user.model');
const { SETTING_TABLE } = require('./../models/setting.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SETTING_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
        onDelete: 'CASCADE',
      },
      setting: {
        allowNull: false,
        type: DataTypes.JSONB,
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
    await queryInterface.dropTable(SETTING_TABLE);
  },
};
