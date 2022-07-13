const express = require('express');
const axios = require('axios');
const passport = require('passport');
const { config } = require('../config/config');

// const passport = require('passport');

const UserMlService = require('../services/userMl.service');
const service = new UserMlService();

// const jwt = require('jsonwebtoken');
// const { config } = require('./../config/config');

const router = express.Router();

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

router.get('/callback', async (req, res, next) => {
  try {
    const { code, state } = req.params;
    // GET ML -> change code for access_token
    const body = {
      grant_type: 'authorization_code',
      client_id: config.mlAppId,
      client_secret: config.mlSecret,
      code: code,
      redirect_uri: `${config.backEnd}/usersml/callback`,
    };

    const resMl = await axios.post(`${config.mlApi}/oauth/token`, body);
    console.log(resMl);
    const rta = await service.update(state, resMl);
    return rta;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
