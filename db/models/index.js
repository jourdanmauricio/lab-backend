const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { ProductMl, ProductMlSchema } = require('./productMl.model');
const { UserMl, UserMlSchema } = require('./userMl.model');
const { Setting, SettingSchema } = require('./setting.model');
// const { Order, OrderSchema } = require('./order.model');
// const { OrderProduct, OrderProductSchema } = require('./order-product.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  ProductMl.init(ProductMlSchema, ProductMl.config(sequelize));
  UserMl.init(UserMlSchema, UserMl.config(sequelize));
  Setting.init(SettingSchema, Setting.config(sequelize));
  // Order.init(OrderSchema, Order.config(sequelize));
  // OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  ProductMl.associate(sequelize.models);
  UserMl.associate(sequelize.models);
  Setting.associate(sequelize.models);
  // Order.associate(sequelize.models);
}

module.exports = setupModels;
