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
        image: 'https://www.bca.co.id/-/media/Feature/Promo/Thumbnail/2021/04/01/20200810-starbucks-banner.jpg',
        title: 'Reward 1',
        description: `🎉 Congratulations on Winning a Coffee Voucher! 🎉 /n We're thrilled to reward your outstanding achievement with a delightful coffee voucher that promises to awaken your senses and brighten your day. Your victory is a testament to your dedication and excellence, and we couldn't be happier to recognize your efforts.`,
        point: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://www.bca.co.id/-/media/Feature/Promo/Page/2021/08/20210806-McDelivery_WebInsertion_Banner.jpg',
        title: 'Reward 2',
        description: `🍽️ Congratulations on Winning a Food Voucher! 🍽️ /n Your dedication and success deserve to be celebrated, and what better way to do so than with a delectable dining experience on us? We are delighted to present you with a mouthwatering Food Voucher as a token of our appreciation for your achievements.`,
        point: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        image: 'https://www.bca.co.id/-/media/Feature/Promo/Page/2023/10/20231020-erajaya-banner.jpg?v=1',
        title: 'Reward 3',
        description: `📱 Congratulations on Winning an iPhone! 📱 /n Your dedication and extraordinary achievement have paid off, and we are thrilled to present you with the ultimate prize – a brand new iPhone! This cutting-edge device is a symbol of your outstanding success, and we're delighted to be a part of your celebration.`,
        point: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert("Plants", plant, {})
    await queryInterface.insert(null, `Users`, { email: `gaw@mail.com`, password: hashPass(`gawgaw`), username: `gawz`, birthday: `10/15/2001`, gender: `Male`, badge: `Beginner`, point: 0, createdAt: new Date(), updatedAt: new Date } )
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
