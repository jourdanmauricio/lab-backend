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
