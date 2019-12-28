'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('projects', 'updatedAt', {type: Sequelize.DATE}, {
      after: 'createdAt'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('projects', 'updatedAt');
  }
};
