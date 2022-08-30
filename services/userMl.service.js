const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserMlService {
  constructor() {}

  async create(data) {
    const newUserMl = await models.UserMl.create(data);

    if (!newUserMl) {
      throw boom.notFound('user not found');
    }
    // const user = await models.User.findByPk(newUserMl.user_id);
    return newUserMl;
  }

  async findByUserId(user_id) {
    const userMl = await models.UserMl.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (!userMl) {
      throw boom.notFound('user not found');
    }
    return userMl;
  }

  async findOne(id) {
    const userMl = await models.UserMl.findByPk(id);
    if (!userMl) {
      throw boom.notFound('user not found');
    }
    return userMl;
  }

  async update(id, changes) {
    const userMl = await this.findOne(id);
    await userMl.update(changes);
    // const user = await models.User.findByPk(id, {
    //   include: ['customer', 'userMl'],
    // });
    return userMl;
  }

  async delete(id) {
    const userMl = await this.findOne(id);
    //const user_id = userMl.user_id;
    return await userMl.destroy();
    // const user = await models.User.findByPk(user_id, {
    //   include: ['customer', 'userMl'],
    // });
    // return;
  }
}

module.exports = UserMlService;
