const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const property = Joi.string().max(30);
const value = Joi.string();
const valueb = Joi.boolean();
const valuea = Joi.array();
const valuej = Joi.object();
const comment = Joi.string();

const getSettingSchema = Joi.object({ id: id.required() });

const createSettingSchema = Joi.object({
  userId: userId.required(),
  property: property.required(),
  value: value,
  valueb: valueb,
  valuea: valuea,
  valuej: valuej,
  comment: comment,
});

module.exports = {
  getSettingSchema,
  createSettingSchema,
};
