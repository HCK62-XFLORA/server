'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Users = require('../data/Users.json') 

    const Forums = require('../data/Forums.json')
    const Threads = require('../data/Threads.json')
    const Comments = require('../data/Forums.json')
    const Reactions = require('../data/Reactions.json')
    
    await queryInterface.bulkInsert('Users', Users.map(users => {
      return{
        ...users,
        createdAt: new Date,
        updatedAt: new Date
      }
     }))
  

     await queryInterface.bulkInsert('Forums', Forums.map(Forums => {
      return{
        ...Forums,
        createdAt: new Date,
        updatedAt: new Date
      }
     }))

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Forums', null, {});

  }
};
