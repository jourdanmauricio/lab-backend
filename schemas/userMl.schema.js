const Joi = require('joi');

const id = Joi.number().integer();
const user_id = Joi.number().integer();
const ml_user_id = Joi.number().integer();
const nickname = Joi.string();
const access_token = Joi.string();
const scope = Joi.string();
const token_type = Joi.string();
const expires_in = Joi.number().integer();
const refresh_token = Joi.string();
//const end_at = Joi.date();
const address = Joi.object();
const buyer_reputation = Joi.object();
const company = Joi.object();
const country_id = Joi.string();
const email = Joi.string();
const first_name = Joi.string();
const gender = Joi.string().allow(null, '');
const identification = Joi.object();
const last_name = Joi.string();
const logo = Joi.string().allow(null, '');
const permalink = Joi.string();
const phone = Joi.object();
const seller_reputation = Joi.object();
const site_id = Joi.string();

const createUserMlSchema = Joi.object({
  ml_user_id: ml_user_id.required(),
  user_id: user_id.required(),
  nickname: nickname.required(),
  access_token: access_token.required(),
  token_type: token_type.required(),
  scope: scope.required(),
  expires_in: expires_in.required(),
  refresh_token: refresh_token.required(),
  address,
  buyer_reputation,
  company,
  country_id,
  email,
  first_name,
  gender,
  id,
  identification,
  last_name,
  logo,
  permalink,
  phone,
  seller_reputation,
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

// const queryUserSchema = Joi.object({
//   limit,
//   offset,
//   q,
// });

module.exports = {
  createUserMlSchema,
  getUserMlSchema,
  updateUserMlSchema,
  //   queryUserSchema,
};
