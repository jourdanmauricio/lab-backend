const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const mlUserId = Joi.number().integer();
const nickname = Joi.string();
const accessToken = Joi.string();
const scope = Joi.string();
const tokenType = Joi.string();
const expiresIn = Joi.number().integer();
const refreshToken = Joi.string();
//const endAt = Joi.date();
const address = Joi.object();
const buyerReputation = Joi.object();
const company = Joi.object();
const countryId = Joi.string();
const email = Joi.string();
const firstName = Joi.string();
const gender = Joi.string();
const identification = Joi.object();
const lastName = Joi.string();
const logo = Joi.string().allow(null, '');
const permalink = Joi.string();
const phone = Joi.object();
const sellerReputation = Joi.object();
const siteId = Joi.string();

// const createUserMLSchema = Joi.object({
//   nickname: nickname.required(),
// });

const createUserMLSchema = Joi.object({
  mlUserId: mlUserId.required(),
  userId: userId.required(),
  nickname: nickname.required(),
  accessToken: accessToken.required(),
  tokenType: tokenType.required(),
  scope: scope.required(),
  expiresIn: expiresIn.required(),
  refreshToken: refreshToken.required(),
  address,
  buyerReputation,
  company,
  countryId,
  email,
  firstName,
  gender,
  id,
  identification,
  lastName,
  logo,
  permalink,
  phone,
  sellerReputation,
  siteId,
});

const getUserMlSchema = Joi.object({
  id: id.required(),
});

// const updatePassUserSchema = Joi.object({
//   id: id.required(),
//   email: email.required(),
//   password: password.required(),
//   newPassword: password.required(),
// });

// const queryUserSchema = Joi.object({
//   limit,
//   offset,
//   q,
// });

module.exports = {
  createUserMLSchema,
  // updateUserMlSchema,
  getUserMlSchema,
  //   updatePassUserSchema,
  //   queryUserSchema,
};
