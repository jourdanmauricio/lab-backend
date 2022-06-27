const { ValidationError } = require('sequelize');
// const boom = require('@hapi/boom');

// Capturamos todos los errores:
function logErrors(err, req, res, next) {
  console.error(err); // mostrar el error en servidor para poder monitorearlo
  next(err); // pasamos el error al siguiente middleware
}

// Detecta el error y crea formato para devolverlo al cliente
function errorHandler(err, req, res, next) {
  //así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
  res.status(500).json({
    // indicar que el error es estatus 500 Internal Server Error
    message: err.message, // mostrar al cliente el mensaje de error
    stack: err.stack, // mostrar info del error
  });
}

// Detecta el error tipo boom
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

// Errores desde el ORM
function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
