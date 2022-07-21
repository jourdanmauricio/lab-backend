const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCT_ML_TABLE = 'products_ml';

const ProductMlSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  prodId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'prod_id',
  },
  sku: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.ENUM('pending', 'active', 'paused', 'closed'),
    allowNull: false,
  },
  startTime: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'start_time',
    defaultValue: Sequelize.NOW,
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
class ProductMl extends Model {
  static associate(models) {
    this.belongsTo(models.Product, { as: 'prod' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_ML_TABLE,
      modelName: 'ProductMl',
      timestamps: false,
    };
  }
}
module.exports = { PRODUCT_ML_TABLE, ProductMlSchema, ProductMl };
