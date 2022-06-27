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
    const user = await models.User.findByPk(data.userId, {
      include: ['customer'],
    });
    if (user.customer) {
      throw boom.conflict('customer exists');
    }
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}
module.exports = CustomerService;
