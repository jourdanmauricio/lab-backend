const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.STRING(20),
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  path_from_root: {
    type: DataTypes.ARRAY(Sequelize.JSONB),
    allowNull: true,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  settings: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  attributes: {
    type: DataTypes.ARRAY(Sequelize.JSONB),
    allowNull: true,
  },
  attributes_oblg: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  description_web: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'category_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    };
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE };
