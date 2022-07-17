const Joi = require('joi');

const id = Joi.number().integer();
const attributes = Joi.array();
const name = Joi.string().min(3).max(100);
const price = Joi.number().integer().min(10);
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();
// const description = Joi.string().min(10);
const image = Joi.string().uri();
const quantity = Joi.number().integer();
const soldQuantity = Joi.number().integer();
const categoryId = Joi.string();
const variations = Joi.array();
const saleTerms = Joi.array();
const startTime = Joi.date();
const pictures = Joi.array();
const status = Joi.string();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  attributes: attributes.required(),
  name: name.required(),
  price: price.required(),
  // description: description.required(),
  thumbnail: image.required(),
  quantity: quantity.required(),
  soldQuantity: soldQuantity.required(),
  categoryId: categoryId.required(),
  variations: variations.required(),
  saleTerms: saleTerms.required(),
  startTime: startTime,
  status: status.required(),
  pictures: pictures,
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  // description: description,
  categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: price_min.required(),
    then: Joi.required(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
