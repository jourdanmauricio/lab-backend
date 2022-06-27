const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
// const boom = require('@hapi/boom');

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkUser } = require('../middlewares/auth.handler');

const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);

      const payload = {
        sub: newUser.id,
        role: newUser.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.status(201).json({ newUser, token });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

// router.delete(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       await service.delete(id);
//       res.status(201).json({ id });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  checkUser('params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // const user = req.user;
      // if (id !== user.sub.toString() && user.role !== 'admin') {
      //   throw boom.forbidden('wrong user_id');
      // }
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
