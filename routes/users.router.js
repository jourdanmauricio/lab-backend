const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const { checkRoles } = require('./../middlewares/auth.handler'); // checkAdminRole,
const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkUser } = require('../middlewares/auth.handler');

const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
  updatePassUserSchema,
  queryUserSchema,
} = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get(
  '/',
  validatorHandler(queryUserSchema, 'query'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('superadmin'),
  async (req, res, next) => {
    try {
      const users = await service.find(req.query);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
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

router.post(
  '/admin',
  validatorHandler(createUserSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  checkRoles('superadmin'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json({ newUser });
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

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  checkUser('params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/change-password/:id',
  passport.authenticate('local', { session: false }),
  validatorHandler(updatePassUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id, newPassword } = req.body;

      const rta = await service.updatePass(id, newPassword);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
