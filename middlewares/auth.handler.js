const boom = require('@hapi/boom');
const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

function checkUser(property) {
  return (req, res, next) => {
    const user = req.user;
    let id = '';
    if (property === 'body') {
      id = req.body.userId;
    } else {
      id = parseInt(req.params.id);
    }

    if (user.role.includes('admin', 'superadmin') || id === user.sub) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = {
  checkApiKey,
  checkAdminRole,
  checkRoles,
  checkUser,
};
