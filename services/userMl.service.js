const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserMlService {
  constructor() {}

  async create(data) {
    const newUserMl = await models.UserMl.create(data);
    if (!newUserMl) {
      throw boom.notFound('user not found');
    }

    const user = await models.User.findByPk(newUserMl.id);
    return user;
    // return newUserMl;
  }

  async findOne(id) {
    const user = await models.UserMl.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  // async findByUserId(userId) {
  //   const userMl = await models.UserMl.findOne({
  //     where: {
  //       userId: userId,
  //     },
  //   });
  //   if (!userMl) {
  //     throw boom.notFound('user not found');
  //   }
  //   return userMl;
  // }

  // async update(id, changes) {
  //   const userMl = await this.findByUserId(id);
  //   await userMl.update(changes);
  //   const user = await models.User.findByPk(id);

  //   return user;
  // }

  async delete(id) {
    const userMl = await this.findOne(id);
    const user = await models.User.findByPk(userMl.userId);
    await userMl.destroy();
    return { user };
  }
}

module.exports = UserMlService;
