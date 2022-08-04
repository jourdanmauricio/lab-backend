const Joi = require('joi');

const attributes = Joi.array();
const available_quantity = Joi.number().integer();
const id = Joi.number().integer();
const category_id = Joi.string();
const condition = Joi.string();
const description = Joi.string().allow(null, '');
const listing_type_id = Joi.string();
const ml_id = Joi.string();
const pictures = Joi.array();
const price = Joi.number();
const price_min = Joi.number();
const price_max = Joi.number();
const sale_terms = Joi.array();
const seller_custom_field = Joi.string();
const sold_quantity = Joi.number().integer();
const start_time = Joi.date();
const status = Joi.string();
const thumbnail = Joi.string().uri();
const title = Joi.string().min(3).max(200);
const variations = Joi.array();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  ml_id: ml_id.required(),
  attributes: attributes.required(),
  title: title.required(),
  seller_custom_field: seller_custom_field.required(),
  price: price.required(),
  description,
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
  description,
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
