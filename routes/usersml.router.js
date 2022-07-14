const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler');
// const passport = require('passport');

const UserMlService = require('../services/userMl.service');
const service = new UserMlService();

const {
  getUserMlSchema,
  updateUserMlSchema,
} = require('./../schemas/userMl.schema');

// const jwt = require('jsonwebtoken');

const router = express.Router();

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserMlSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userMl = await service.findByUserId(id);
      res.json(userMl);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserMlSchema, 'params'),
  validatorHandler(updateUserMlSchema, 'body'),
  async (req, res, next) => {
    try {
      const { mlUser } = req.body;
      const rta = await service.create(mlUser);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserMlSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
