'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('MyPlants', 'disease', {type: Sequelize.STRING})
    await queryInterface.addColumn('MyPlants', 'confidence', {type: Sequelize.FLOAT})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('MyPlants', 'disease')
    await queryInterface.removeColumn('MyPlants', 'confidence')
  }
};
