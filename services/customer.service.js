const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({ include: ['user'] });
    return rta;
  }
  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }
  async create(data) {
    const user = await models.User.findByPk(data.user_id, {
      include: ['customer'],
    });
    if (user.customer) {
      throw boom.conflict('customer exists');
    }
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const user = await models.User.findByPk(changes.user_id);
    if (changes.user_id !== customer.user_id) {
      throw boom.badRequest('Perfil incorrecto!');
    }
    const rta = await customer.update(changes);
    await user.update({ updated_at: Date.now() });
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}
module.exports = CustomerService;
