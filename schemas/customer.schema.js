const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const lastName = Joi.string().max(50);
const phone = Joi.string()
  .length(10)
  .pattern(/^[0-9]+$/);
const userId = Joi.number().integer();
const documentType = Joi.string().min(1);
const documentNumber = Joi.string().min(1);

const getCustomerSchema = Joi.object({ id: id.required() });

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  documentType: documentType,
  documentNumber: documentNumber,
  userId: userId,
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
  documentType,
  documentNumber,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
};
