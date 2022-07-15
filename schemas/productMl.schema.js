const Joi = require('joi');

const id = Joi.number().integer();
const prodId = Joi.integer();
const price = Joi.number().integer().min(10);
const startTime = Joi.date();

const createProductSchema = Joi.object({
  name: id.required(),
  prodId: prodId.required(),
  price: price.required(),
  categoryId: startTime.required(),
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
