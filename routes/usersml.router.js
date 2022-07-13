const express = require('express');
const axios = require('axios');
const passport = require('passport');
const { config } = require('../config/config');
const validatorHandler = require('./../middlewares/validator.handler');
// const passport = require('passport');

const UserMlService = require('../services/userMl.service');
const service = new UserMlService();

const { getUserMlSchema } = require('./../schemas/userMl.schema');

// const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/callback', async (req, res, next) => {
  try {
    const { code, state } = req.query;
    // GET ML -> change code for access_token

    const resMl = await axios({
      method: 'post',
      url: `${config.mlApi}/oauth/token`,
      data: {
        grant_type: 'authorization_code',
        client_id: config.mlAppId,
        client_secret: config.mlSecret,
        code: code,
        redirect_uri: `${config.backEnd}/usersml/callback`,
      },
    });
    const rta = await service.update(state, resMl);
    res.status(200).json(rta);
    // res.send(state);
  } catch (error) {
    next(error);
  }
});

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
