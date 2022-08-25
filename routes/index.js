const express = require('express');

const authRouter = require('./auth.router');
const customersRouter = require('./customers.router');
const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const productsMlRouter = require('./productsml.router');
const productsWebRouter = require('./productsweb.router');
const settingsRouter = require('./settings.router');
const usersRouter = require('./users.router');
const usersMlRouter = require('./usersml.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/auth', authRouter);
  router.use('/customers', customersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/productsml', productsMlRouter);
  router.use('/productsweb', productsWebRouter);
  router.use('/settings', settingsRouter);
  router.use('/users', usersRouter);
  router.use('/usersml', usersMlRouter);
}

module.exports = routerApi;
