const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsMlService {
  constructor() {}

  async findOne(id) {
    const product = await models.ProductMl.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async create(data) {
    const newProduct = await models.ProductMl.create(data);
    return newProduct;
  }

  async update(id, changes) {
    const productMl = await this.findOne(id);
    const rta = await productMl.update(changes);
    return rta;
  }

  async find() {
    const productsMl = await models.ProductMl.findAll();
    return productsMl;
  }
}
module.exports = ProductsMlService;
