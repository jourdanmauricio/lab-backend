const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const UserService = require('./user.service');
const service = new UserService();

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
    return userMl;
  }

  // async update(state, resMl) {
  //   const userMl = await this.findByToken(state);
  //   const rta = await userMl.update(resMl);
  //   return rta;
  // }

  async updateMl(changes) {
    const token = changes.token;
    const payload = await jwt.verify(token, config.jwtSecret);
    const user = await service.findOne(payload.sub);

    return user;

    // if (user.authMlToken !== token) {
    //   throw boom.unauthorized();
    // }

    // changes.token = '';

    // const userMl = await this.findByUserId(user.id);

    // if (userMl.nickname !== changes.nickname) {
    //   throw boom.unauthorized();
    // }

    // const rta = await userMl.update(changes);
    // return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { user };
  }

  async solAuthMl(req) {
    const nickname = req.body.nickname;
    // obtengo el id del token
    const userId = req.user.sub;

    // Verifico usuario
    const user = await service.findOne(userId);
    if (!user) {
      throw boom.unauthorized();
    }
    // Creo token temporal para solicitud ML
    const newPayload = { sub: user.id };
    const token = jwt.sign(newPayload, config.jwtSecret, {
      expiresIn: '60min',
    });
    // Guardo token en user_ml para verificar respuesta posterior

    await this.create({
      userId: user.id,
      authMlToken: token,
      nickname: nickname,
    });

    // retorno los datos para que el front redirija a ML auth app.
    const rta = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${config.mlAppId}&redirect_uri=${config.frontEnd}/settings/meli-callback&state=${token}`;
    return rta;
  }
}

module.exports = UserMlService;
