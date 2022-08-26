const Joi = require('joi');

const id = Joi.number().integer();
const user_id = Joi.number().integer();
const nickname = Joi.string();
const access_token = Joi.string();
const token_type = Joi.string();
const expires_in = Joi.number().integer();
const scope = Joi.string();
const refresh_token = Joi.string();
const permalink = Joi.string();
const site_id = Joi.string();

const createUserMlSchema = Joi.object({
  id: id.required(),
  user_id: user_id.required(),
  nickname: nickname.required(),
  access_token: access_token.required(),
  token_type: token_type.required(),
  scope: scope.required(),
  expires_in: expires_in.required(),
  refresh_token: refresh_token.required(),
  permalink,
  site_id,
});

const updateUserMlSchema = Joi.object({
  user_id: user_id.required(),
  access_token: access_token.required(),
  token_type: token_type.required(),
  scope: scope.required(),
  expires_in: expires_in.required(),
  refresh_token: refresh_token.required(),
});

const getUserMlSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserMlSchema,
  getUserMlSchema,
  updateUserMlSchema,
};
