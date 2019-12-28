'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('projects', 'user_id', 'userId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('projects', 'userId', 'user_id');
  }
};
