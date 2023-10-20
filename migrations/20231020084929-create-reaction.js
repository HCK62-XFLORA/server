'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ThreadId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Threads`
        },
        key: `id`
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Users`
        },
        key: `id`
      },
      reaction: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Reactions');
  }
};