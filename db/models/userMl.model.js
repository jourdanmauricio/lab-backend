const { Model, DataTypes, Sequelize } = require('sequelize');
const USER_ML_TABLE = 'users_ml';

const UserMlSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  user_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  ml_user_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  nickname: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  access_token: {
    allowNull: true,
    type: DataTypes.STRING(),
  },
  token_type: {
    allowNull: true,
    type: DataTypes.STRING(20),
  },
  scope: {
    allowNull: true,
    type: DataTypes.STRING(50),
  },
  expires_in: {
    allowNull: true,
    type: DataTypes.INTEGER,
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
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
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
