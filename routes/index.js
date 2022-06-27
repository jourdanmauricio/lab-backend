const express = require('express');

const authRouter = require('./auth.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/auth', authRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
}

module.exports = routerApi;
