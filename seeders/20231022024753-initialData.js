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

    const reward = [
      {
        image: 'https://images.bisnis.com/posts/2020/09/02/1286121/pupuk-kaltim.jpg',
        title: 'Reward 1',
        description: `Congratulations on Winning a Fertilizer!  /n We're thrilled to reward your outstanding achievement with a delightful fertilizer voucher that promises to grow your plant beautifully. Your victory is a testament to your dedication and excellence, and we couldn't be happier to recognize your efforts.`,
        point: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://m.media-amazon.com/images/I/71+RqzRpHLL.jpg',
        title: 'Reward 2',
        description: `Congratulations on Winning a Gardening Toolkit! /n Your dedication and success deserve to be celebrated, and what better way to do so than with a delectable dining experience on us? We are delighted to present you with a high quality toolkit as a token of our appreciation for your achievements.`,
        point: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://asset.kompas.com/crops/-ZYH4j5z4c-Pki9wCd__IKJlm_s=/0x6:1920x1286/1200x800/data/photo/2021/02/08/6020c98f4a3ab.jpg',
        title: 'Reward 3',
        description: `Congratulations on Winning a Precious Bonsai Tree! /n Your dedication and extraordinary achievement have paid off, and we are thrilled to present you with the ultimate prize - a noble Bonsai Tree! This exotic tree is a symbol of your outstanding success, and we're delighted to be a part of your celebration.`,
        point: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    const user = [
      { email: `gaw@mail.com`, password: hashPass(`gawgaw`), username: `gawz`, birthday: `10/15/2001`, gender: `Male`, badge: `Beginner`, point: 0, createdAt: new Date(), updatedAt: new Date },
      {
        email: `frando@mail.com`, password: hashPass(`abcdefgh`), username: `frandow`, birthday: `10/15/1988`, gender: `Male`, badge: `Beginner`, point: 0, createdAt: new Date(), updatedAt: new Date
      }
    ]

    await queryInterface.bulkInsert("Plants", plant, {})
    await queryInterface.bulkInsert(`Users`, user, {})
    await queryInterface.bulkInsert(`Forums`, forum, {})
    await queryInterface.bulkInsert('Rewards', reward, {})
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
    await queryInterface.bulkDelete('Rewards')

  }
};
