const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);

    delete newUser.dataValues.password;
    return newUser;
  }

  async find(query) {
    const options = {
      attributes: {
        exclude: ['password'],
      },
      include: ['customer'],
      where: {},
      order: [['updated_at', 'DESC']],
    };
    const { limit, offset, q } = query;

    if (q) {
      options.where = {
        [Op.or]: [
          {
            email: {
              [Op.like]: `%${q}%`,
            },
          },
          {
            '$customer.phone$': {
              [Op.like]: `%${q}%`,
            },
          },
          {
            '$customer.name$': {
              [Op.like]: `%${q}%`,
            },
          },
          {
            '$customer.last_name$': {
              [Op.like]: `%${q}%`,
            },
          },
        ],
      };
    }
    const count = await models.User.count(options);

    if (limit && offset) {
      (options.limit = limit), (options.offset = offset);
    }

    const users = await models.User.findAll(options);

    const rta = {
      paging: {
        total: count,
        offset: offset,
        limit: limit,
      },
      results: users,
    };

    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      include: ['customer'],
      where: { email },
    });
    return rta;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async updatePass(id, newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);
    const rta = await this.update(id, { password: hash });
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
