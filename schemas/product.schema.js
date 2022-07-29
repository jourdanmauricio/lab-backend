const Joi = require('joi');

const id = Joi.number().integer();
const ml_id = Joi.string();
const attributes = Joi.array();
const title = Joi.string().min(3).max(100);
const seller_custom_field = Joi.string();
const price = Joi.number();
const price_min = Joi.number();
const price_max = Joi.number();
// const description = Joi.string().min(10);
const thumbnail = Joi.string().uri();
const available_quantity = Joi.number().integer();
const sold_quantity = Joi.number().integer();
const condition = Joi.string();
const listing_type_id = Joi.string();
const category_id = Joi.string();
const variations = Joi.array();
const sale_terms = Joi.array();
const start_time = Joi.date();
const pictures = Joi.array();
const status = Joi.string();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  ml_id: ml_id.required(),
  attributes: attributes.required(),
  title: title.required(),
  seller_custom_field: seller_custom_field.required(),
  price: price.required(),
  // description: description.required(),
  thumbnail: thumbnail.required(),
  listing_type_id: listing_type_id.required(),
  condition: condition.required(),
  available_quantity: available_quantity.required(),
  sold_quantity: sold_quantity.required(),
  category_id: category_id.required(),
  variations: variations.required(),
  sale_terms: sale_terms.required(),
  start_time: start_time,
  status: status.required(),
  pictures: pictures,
});

const updateProductSchema = Joi.object({
  id: id,
  attributes,
  title,
  seller_custom_field,
  price,
  available_quantity,
  thumbnail,
  condition,
  status,
  sale_terms,
  listing_type_id,
  // description: description,
  category_id,
  variations,
  pictures,
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
