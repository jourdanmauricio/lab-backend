const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({ include: ['user'] });
    return rta;
  }

  async findOneById(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async findOne(id) {
    // const user = await models.Customer.findByPk(id);
    const user = await models.Customer.findOne({ where: { user_id: id } });
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }
  async create(id, data) {
    const user = await models.User.findByPk(id, {
      include: ['customer'],
    });
    if (user.customer) {
      throw boom.conflict('customer exists');
    }
    data.user_id = id;
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
