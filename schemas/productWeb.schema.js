const Joi = require('joi');

const id = Joi.string();
const prod_id = Joi.number().integer();
const seller_custom_field = Joi.string();
const price = Joi.number().min(10);
const available_quantity = Joi.number().integer();
const status = Joi.string();
const permalink = Joi.string();
const start_time = Joi.date();
const variations = Joi.array();

const createProductWebSchema = Joi.object({
  id: id,
  prod_id: prod_id.required(),
  seller_custom_field: seller_custom_field.required(),
  price: price.required(),
  available_quantity: available_quantity.required(),
  status: status.required(),
  permalink: permalink,
  start_time: start_time.required(),
  variations,
});

const getProductWebSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductWebSchema,
  // updateProductSchema,
  getProductWebSchema,
  // queryProductSchema,
};
