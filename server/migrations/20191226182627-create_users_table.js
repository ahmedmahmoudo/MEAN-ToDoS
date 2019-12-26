'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        first_name: {
          type: Sequelize.STRING,
        },
        last_name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING
        },
        role: {
          type: Sequelize.STRING
        },
        createdAt: {
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      },
      {
        engine: 'MyISAM',
        charset: 'utf8',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
