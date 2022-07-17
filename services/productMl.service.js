// const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
// const { Op } = require('sequelize');

class ProductsMlService {
  constructor() {
    this.products = [];
    // this.generate();
  }

  async create(data) {
    const newProduct = await models.ProductMl.create(data);
    return newProduct;
  }

  async find() {
    const productsMl = await models.ProductMl.findAll();
    return productsMl;
  }
}
module.exports = ProductsMlService;
