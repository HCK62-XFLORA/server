'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MyPlants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PlantId: {
        type: Sequelize.INTEGER // INI HARUS KEHUBUNG KE TABLE PLANTS!!!!!!!!!!
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Users`
        },
        key: `id`
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MyPlants');
  }
};