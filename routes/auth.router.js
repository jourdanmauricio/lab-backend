const express = require('express');
const passport = require('passport');

const AuthService = require('./../services/auth.service');
const service = new AuthService();

const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      // preparamos el payload
      const payload = {
        sub: user.id,
        role: user.role,
      };

      // generamos token
      const token = jwt.sign(payload, config.jwtSecret);

      // retornamos el user y el token
      // res.status(200).json({ user, token });
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecovery(email);
    res.status(200).json(rta);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await service.changePassword(token, newPassword);
    res.status(200).json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
