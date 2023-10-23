'use strict';

const { hashPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const plant = require("../data/plants.json").map((el) => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    const forum = [
      {
        name: "Tips and trick",
        imgUrl: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Disease",
        imgUrl: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Stories",
        imgUrl: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert("Plants", plant, {})
    await queryInterface.insert(null, `Users`, { email: `gaw@mail.com`, password: hashPass(`gawgaw`), username: `gawz`, birthday: `10/15/2001`, gender: `Male`, badge: `Beginner`, point: 0, createdAt: new Date(), updatedAt: new Date } )
    await queryInterface.bulkInsert(`Forums`, forum, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Plants')
    await queryInterface.bulkDelete(`Users`)
    await queryInterface.bulkDelete(`Forums`)
  }
};
