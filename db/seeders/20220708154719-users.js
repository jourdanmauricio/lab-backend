'use strict';

const { faker } = require('@faker-js/faker');

const users = [...Array(100)].map(() => ({
  email: faker.internet.email(),
  password: faker.internet.password(8),
  role: 'customer',
  created_at: new Date(),
  updated_at: new Date(),
}));
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', users, {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
