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
  '/authML',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const rta = await service.solAuthMl(req);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/authML/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserMlSchema, 'params'),
  validatorHandler(updateUserMlSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { mlUser } = req.body;
      const rta = await service.update(id, mlUser);
      res.status(200).json(rta);
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
