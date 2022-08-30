const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCT_ML_TABLE = 'products_ml';

const ProductMlSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.STRING,
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
  permalink: { allowNull: false, type: DataTypes.STRING },
  start_time: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  variations: { type: DataTypes.JSONB, allowNull: true },
  // created_at: {
  //   allowNull: false,
  //   type: DataTypes.DATE,
  //   defaultValue: Sequelize.NOW,
  // },
  // updated_at: {
  //   allowNull: false,
  //   type: DataTypes.DATE,
  //   defaultValue: Sequelize.NOW,
  // },
};
class ProductMl extends Model {
  static associate(models) {
    // this.belongsTo(models.Product, { as: 'prod' });
    this.belongsTo(models.Product, {
      foreignKey: 'prod_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_ML_TABLE,
      modelName: 'ProductMl',
      timestamps: true,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}
module.exports = { PRODUCT_ML_TABLE, ProductMlSchema, ProductMl };
