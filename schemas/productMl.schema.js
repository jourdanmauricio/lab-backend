const Joi = require('joi');

const id = Joi.number();
const prodId = Joi.number();
const price = Joi.number().min(10);
const quantity = Joi.number().integer();
const status = Joi.string();
const startTime = Joi.date();

const createProductSchema = Joi.object({
  prodId: prodId.required(),
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
  createProductSchema,
  // updateProductSchema,
  getProductSchema,
  // queryProductSchema,
};
