const Joi = require('joi');

const id = Joi.number().integer();
//const userId = Joi.number().integer();
const mlUserId = Joi.number().integer();
const nickname = Joi.string();
const accessToken = Joi.string();
const scope = Joi.string();
const tokenType = Joi.string();
const expiresIn = Joi.number().integer();
const refreshToken = Joi.string();
//const endAt = Joi.date();
const authMlToken = Joi.string();

const createUserMLSchema = Joi.object({
  nickname: nickname.required(),
});

const updateUserMlSchema = Joi.object({
  mlUserId,
  nickname,
  accessToken,
  tokenType,
  scope,
  expiresIn,
  refreshToken,
  authMlToken,
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
  updateUserMlSchema,
  getUserMlSchema,
  //   updatePassUserSchema,
  //   queryUserSchema,
};
