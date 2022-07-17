const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
// const { Op } = require('sequelize');

class ProductsService {
  constructor() {
    this.products = [];
    // this.generate();
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    return product;
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    newProduct.mlId = data.mlId;
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['prodMl'],
      where: {},
      order: [['updated_at', 'DESC']],
    };
    // const { limit, offset, price, price_min, price_max } = query;
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    // if (price) {
    //   options.where.price = price;
    // }
    // if (price_min && price_max) {
    //   options.where.price = {
    //     [Op.gte]: price_min,
    //     [Op.lte]: price_max,
    //   };
    // }

    const count = await models.Product.count(options);

    if (limit && offset) {
      (options.limit = limit), (options.offset = offset);
    }

    const products = await models.Product.findAll(options);

    const rta = {
      paging: {
        total: count,
        offset: offset,
        limit: limit,
      },
      results: products,
    };
    return rta;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
