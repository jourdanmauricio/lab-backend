const Joi = require('joi');

const id = Joi.string();
const prodId = Joi.number().integer();
const sku = Joi.string();
const price = Joi.number().min(10);
const quantity = Joi.number().integer();
const status = Joi.string();
const startTime = Joi.date();

const createProductMlSchema = Joi.object({
  id: id.required(),
  prodId: prodId.required(),
  sku: sku.required(),
  price: price.required(),
  quantity: quantity.required(),
  status: status.required(),
  startTime: startTime.required(),
});

// const updateProductSchema = Joi.object({
//   name: name,
//   price: price,
//   image: image,
//   description: description,
//   categoryId,
// });

const getProductSchema = Joi.object({
  id: id.required(),
});

// const queryProductSchema = Joi.object({
//   limit,
//   offset,
//   price,
//   price_min,
//   price_max: price_max.when('price_min', {
//     is: price_min.required(),
//     then: Joi.required(),
//   }),
// });

module.exports = {
  createProductMlSchema,
  // updateProductSchema,
  getProductSchema,
  // queryProductSchema,
};
