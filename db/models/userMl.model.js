const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const USER_ML_TABLE = 'users_ml';

const UserMlSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
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
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class UserMl extends Model {
  static associate(models) {
    // this.belongsTo(models.User, { as: 'user' });
    this.belongsTo(models.User, { as: 'user', foreignKey: 'id' });
    // this.belongsTo(models.User, {
    //   foreignKey: 'user_id',
    // });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_ML_TABLE,
      modelName: 'UserMl',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}
module.exports = { USER_ML_TABLE, UserMlSchema, UserMl };
