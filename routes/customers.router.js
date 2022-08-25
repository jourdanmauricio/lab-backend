const express = require('express');
const passport = require('passport');
const CustomerService = require('./../services/customer.service');
const validationHandler = require('../middlewares/validator.handler');
// const { checkUser } = require('../middlewares/auth.handler');

const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const customer = await service.findOne(user.sub);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validationHandler(createCustomerSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  // checkUser('body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      res.status(201).json(await service.create(user.sub, body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  // checkUser('body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      body.updated_at = Date.now();
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
