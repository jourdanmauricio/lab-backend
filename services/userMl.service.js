const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserMlService {
  constructor() {}

  async create(data) {
    const newUserMl = await models.UserMl.create(data);
    if (!newUserMl) {
      throw boom.notFound('user not found');
    }

    const user = await models.User.findByPk(newUserMl.userId, {
      include: ['customer', 'userMl'],
    });
    return user;
    // return newUserMl;
  }

  async findOne(id) {
    const userMl = await models.UserMl.findByPk(id);
    if (!userMl) {
      throw boom.notFound('user not found');
    }
    return userMl;
  }

  async delete(id) {
    const userMl = await this.findOne(id);
    const userId = userMl.userId;
    await userMl.destroy();
    const user = await models.User.findByPk(userId, {
      include: ['customer', 'userMl'],
    });
    return { user };
  }
}

module.exports = UserMlService;
