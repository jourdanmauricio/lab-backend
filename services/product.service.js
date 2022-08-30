const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {
  constructor() {
    this.products = [];
    // this.generate();
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async findSkus() {
    const skus = await models.Product.findAll({
      attributes: ['id', 'seller_custom_field'],
    });
    return skus;
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    newProduct.ml_id = data.ml_id;
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['prodMl', 'prodWeb'],
      where: {},
      order: [['updated_at', 'DESC']],
    };
    // const { limit, offset, price, price_min, price_max } = query;
    const { limit, offset, q } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    let search = JSON.parse(q);

    if (search.status) {
      options.where = {
        ...options.where,
        [Op.and]: [
          {
            status: {
              [Op.eq]: search.status,
            },
          },
        ],
      };
    }
    if (search.condition) {
      options.where = {
        ...options.where,
        [Op.and]: [
          {
            condition: {
              [Op.eq]: search.condition,
            },
          },
        ],
      };
    }
    if (search.category_id) {
      options.where = {
        ...options.where,
        [Op.and]: [
          {
            category_id: {
              [Op.eq]: search.category_id,
            },
          },
        ],
      };
    }
    if (search.ml_id) {
      options.where = {
        ...options.where,
        [Op.and]: [
          {
            '$prodMl.id$': {
              [Op.eq]: search.ml_id,
            },
          },
        ],
      };
    }
    if (search.text) {
      options.where = {
        ...options.where,
        [Op.or]: [
          {
            description: {
              [Op.eq]: `%${search.text}%`,
            },
          },
          {
            title: {
              [Op.like]: `%${search.text}%`,
            },
          },
          {
            seller_custom_field: {
              [Op.like]: `%${search.text}%`,
            },
          },
          // {
          //   '$customer.name$': {
          //     [Op.like]: `%${q}%`,
          //   },
          // },
          // {
          //   '$customer.last_name$': {
          //     [Op.like]: `%${q}%`,
          //   },
          // },
        ],
      };
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
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
