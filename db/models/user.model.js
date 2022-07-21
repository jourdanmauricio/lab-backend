const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING(150),
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING(150),
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING(20),
    defaultValue: 'customer',
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

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' });
    this.hasOne(models.UserMl, { as: 'userMl', foreignKey: 'userId' });
    this.hasOne(models.Setting, { as: 'setting', foreignKey: 'userId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
      },
    };
  }
}
module.exports = { USER_TABLE, UserSchema, User };
