const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const SETTING_TABLE = 'settings';

const SettingSchema = {
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
    onDelete: 'SET NULL',
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
};

class Setting extends Model {
  static associate(models) {
    // this.belongsTo(models.User, { as: 'user' });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SETTING_TABLE,
      modelName: 'Setting',
      timestamps: false,
    };
  }
}

module.exports = { Setting, SettingSchema, SETTING_TABLE };
