const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');

class CategoryService {
  constructor() {}
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find(query) {
    const options = {
      where: {},
      order: [['updated_at', 'DESC']],
    };
    const { limit, offset, q } = query;
    // const { limit, offset } = query;

    if (q) {
      options.where = {
        [Op.or]: [
          {
            ml_id: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            full_name: {
              [Op.like]: `%${q}%`,
            },
          },
        ],
      };
    }

    const count = await models.Category.count(options);

    if (limit && offset) {
      (options.limit = limit), (options.offset = offset);
    }

    const categories = await models.Category.findAll(options);
    const rta = {
      paging: {
        total: count,
        offset: offset,
        limit: limit,
      },
      results: categories,
    };

    return rta;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    return category;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;
