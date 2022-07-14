const boom = require('@hapi/boom');

// Validamos con Joi
function validatorHandler(schema, property) {
  return (req, res, next) => {
    // puede venir en body, params, o query
    const data = req[property];
    // para que envíe todos los errores juntos
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next(); //si no hay error sigue
  };
}

module.exports = validatorHandler;
