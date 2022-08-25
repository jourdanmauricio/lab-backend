const express = require('express');
const passport = require('passport');

const ProductMlService = require('./../services/productMl.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  // updateProductSchema,
  createProductMlSchema,
  getProductMlSchema,
  // queryProductMlSchema,
} = require('./../schemas/productMl.schema');

const router = express.Router();
const service = new ProductMlService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(queryProductMlSchema, 'query'),
  async (req, res, next) => {
    try {
      const users = await service.find(req.query);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductMlSchema, 'params'),
  validatorHandler(createProductMlSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const newCategory = await service.update(id, body);
      res.status(200).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductMlSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductMlSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const delProd = await service.delete(id);
      res.status(200).json(delProd);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
