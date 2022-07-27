const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  document_type: {
    allowNull: true,
    type: DataTypes.STRING(20),
  },
  document_number: {
    allowNull: true,
    type: DataTypes.STRING(20),
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

class Customer extends Model {
  static associate(models) {
    // this.belongsTo(models.User, { as: 'user' });
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
    });

    //this.hasMany(models.Order, {
    //  as: 'orders',
    //  foreignKey: 'customerId',
    //});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
