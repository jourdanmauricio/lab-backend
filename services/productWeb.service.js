const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsWebService {
  constructor() {}

  async findOne(id) {
    const product = await models.ProductWeb.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async create(data) {
    const newProduct = await models.ProductWeb.create(data);
    return newProduct;
  }

  async update(id, changes) {
    const productWeb = await this.findOne(id);
    const rta = await productWeb.update(changes);
    return rta;
  }

  async delete(id) {
    const productWeb = await this.findOne(id);
    await productWeb.destroy();
    return { id };
  }

  async find() {
    const productsWeb = await models.ProductWeb.findAll();
    return productsWeb;
  }
}
module.exports = ProductsWebService;
