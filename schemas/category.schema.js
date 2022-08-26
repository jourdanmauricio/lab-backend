const Joi = require('joi');

const id = Joi.string().min(3).max(20);
const name = Joi.string().min(3).max(100);
const full_name = Joi.string();
const path_from_root = Joi.array();
const picture = Joi.string().allow(null, '').uri();
const settings = Joi.object();
const attributes = Joi.array();
const attributes_oblg = Joi.object();
const description_web = Joi.string().allow(null, '');
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const q = Joi.string();

const createCategorySchema = Joi.object({
  id: id.required(),
  name: name.required(),
  full_name: full_name,
  path_from_root: path_from_root,
  picture: picture,
  settings: settings,
  attributes: attributes,
  attributes_oblg: attributes_oblg,
  description_web,
});

const updateCategorySchema = Joi.object({
  name: name,
  image: picture,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const queryUserSchema = Joi.object({
  limit,
  offset,
  q,
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  queryUserSchema,
};
