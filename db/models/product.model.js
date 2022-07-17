const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');
const PRODUCT_TABLE = 'products';
const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  attributes: { type: DataTypes.JSONB, allowNull: true },
  name: { type: DataTypes.STRING, allowNull: false },
  // description: { type: DataTypes.TEXT, allowNull: true },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  soldQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sold_quantity',
  },
  status: {
    type: DataTypes.ENUM('pending', 'active', 'paused', 'closed'),
    allowNull: false,
  },
  pictures: { type: DataTypes.JSONB, allowNull: false },
  thumbnail: { type: DataTypes.STRING, allowNull: false },
  saleTerms: { type: DataTypes.JSONB, allowNull: true },
  variations: { type: DataTypes.JSONB, allowNull: true },
  startTime: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'start_time',
    defaultValue: Sequelize.NOW,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: CATEGORY_TABLE, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
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
class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
    this.hasOne(models.ProductMl, { as: 'productMl', foreignKey: 'prodId' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}
module.exports = { PRODUCT_TABLE, ProductSchema, Product };
