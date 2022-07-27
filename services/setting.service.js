const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class SettingService {
  constructor() {}

  async findByUserId(user_id) {
    const setting = await models.Setting.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (!setting) {
      throw boom.notFound('user not found');
    }
    return setting;
  }

  async createSettings(data) {
    const rta = await models.Setting.create(data);
    return rta;
  }

  async updateSettings(id, data) {
    const userSetting = await this.findByUserId(id);
    const rta = await userSetting.update(data);
    return rta;
  }
}

module.exports = SettingService;
