const { config } = require('./../config/config');
const { Sequelize } = require('sequelize');

const setupModels = require('./../db/models');

const options = {
  dialect: config.dbEngine,
  logging: config.isProd ? false : (msg) => console.log(msg),
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

// sequelize.sync();

module.exports = sequelize;
