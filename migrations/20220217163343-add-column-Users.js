"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "subscribe", Sequelize.BOOLEAN);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "subscribe");
  },
};
