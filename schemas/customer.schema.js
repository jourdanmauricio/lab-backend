const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const last_name = Joi.string().max(50);
const phone = Joi.string()
  .length(10)
  .pattern(/^[0-9]+$/);
const user_id = Joi.number().integer();
const document_type = Joi.string().min(1);
const document_number = Joi.string().min(1);
const updated_at = Joi.date();

const getCustomerSchema = Joi.object({ id: id.required() });

const createCustomerSchema = Joi.object({
  name: name.required(),
  last_name: last_name.required(),
  phone: phone.required(),
  document_type: document_type,
  document_number: document_number,
  user_id: user_id,
});

const updateCustomerSchema = Joi.object({
  name,
  last_name,
  phone,
  user_id,
  document_type,
  document_number,
  updated_at,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
};
