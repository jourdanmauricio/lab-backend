const Joi = require('joi');

const id = Joi.number().integer();
const user_id = Joi.number().integer();
const setting = Joi.object();

const getSettingSchema = Joi.object({ id: id.required() });

const createSettingSchema = Joi.object({
  user_id: user_id.required(),
  setting: setting,
});

module.exports = {
  getSettingSchema,
  createSettingSchema,
};
