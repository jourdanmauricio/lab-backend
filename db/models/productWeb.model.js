const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCT_WEB_TABLE = 'products_web';

const ProductWebSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  prod_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  seller_custom_field: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  available_quantity: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.ENUM(
      'pending',
      'under_review',
      'inactive',
      'active',
      'paused',
      'closed'
    ),
    allowNull: false,
  },
  permalink: { allowNull: true, type: DataTypes.STRING },
  start_time: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  variations: { type: DataTypes.JSONB, allowNull: true },
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
class ProductWeb extends Model {
  static associate(models) {
    // this.belongsTo(models.Product, { as: 'prod' });
    this.belongsTo(models.Product, {
      foreignKey: 'prod_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_WEB_TABLE,
      modelName: 'ProductWeb',
      timestamps: true,
      underscored: true,
    };
  }
}
module.exports = { PRODUCT_WEB_TABLE, ProductWebSchema, ProductWeb };
