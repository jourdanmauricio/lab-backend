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
  userId: {
    field: 'user_id',
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
  property: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(30),
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valueb: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  valuea: {
    type: DataTypes.ARRAY(Sequelize.JSONB),
    allowNull: true,
  },
  valuej: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  comment: {
    type: DataTypes.STRING,
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
};

class Setting extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
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
