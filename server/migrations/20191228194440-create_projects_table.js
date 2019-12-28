'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('projects', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {model: 'users', key: 'id'}
    },
    access: {
      type: Sequelize.ENUM('Public', 'Private')
    },
    createdAt: {
      type: Sequelize.DATE
    },
    deletedAt: {
      type: Sequelize.DATE
    }
   });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projects');
  }
};
