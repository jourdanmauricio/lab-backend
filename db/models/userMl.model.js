const { Model, DataTypes, Sequelize } = require('sequelize');
const USER_ML_TABLE = 'users_ml';

const UserMlSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
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
  scope: {
    allowNull: true,
    type: DataTypes.STRING(50),
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
};

class UserMl extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_ML_TABLE,
      modelName: 'UserMl',
      timestamps: false,
    };
  }
}
module.exports = { USER_ML_TABLE, UserMlSchema, UserMl };
