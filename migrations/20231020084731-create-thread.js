'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Threads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      content: {
        type: Sequelize.TEXT
      },
      ForumId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Threads`
        },
        key: `id`
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
    await queryInterface.dropTable('Threads');
  }
};