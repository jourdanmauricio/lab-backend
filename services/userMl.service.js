const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserMlService {
  constructor() {}

  async create(data) {
    const newUserMl = await models.UserMl.create(data);
    if (!newUserMl) {
      throw boom.notFound('user not found');
    }
    return newUserMl;
  }

  async findOne(id) {
    const user = await models.UserMl.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  // async findByToken(token) {
  //   const userMl = await models.UserMl.findOne({
  //     where: {
  //       authMlToken: token,
  //     },
  //   });
  //   return userMl;
  // }

  async findByUserId(userId) {
    const userMl = await models.UserMl.findOne({
      where: {
        userId: userId,
      },
    });
    if (!userMl) {
      throw boom.notFound('user not found');
    }
    return userMl;
  }

  // async update(state, resMl) {
  //   const userMl = await this.findByToken(state);
  //   const rta = await userMl.update(resMl);
  //   return rta;
  // }

  async update(id, changes) {
    const userMl = await this.findByUserId(id);

    const rta = await userMl.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { user };
  }
}

module.exports = UserMlService;
