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

const createProductMlSchema = Joi.object({
  id: id.required(),
  prod_id: prod_id.required(),
  seller_custom_field: seller_custom_field.required(),
  price: price.required(),
  available_quantity: available_quantity.required(),
  status: status.required(),
  permalink: permalink.required(),
  start_time: start_time.required(),
  variations,
});

// const updateProductSchema = Joi.object({
//   name: name,
//   price: price,
//   image: image,
//   description: description,
//   category_id,
// });

const getProductMlSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductMlSchema,
  // updateProductSchema,
  getProductMlSchema,
  // queryProductSchema,
};
