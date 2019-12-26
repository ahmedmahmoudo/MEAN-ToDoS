'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'token_createdAt', {type: Sequelize.DATE});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'token_createdAt');
  }
};
