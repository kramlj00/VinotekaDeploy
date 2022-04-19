"use strict";

module.exports = {
  up: async (queryInterface, sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("Products", [
        {
          seller_id: 1,
          category: "Crno vino",
          image: "/images/vino1.jpg",
          price: 100,
          bottleSize: 1,
          countInStock: 0,
          sort: "Cabernet Saugvinon",
          seller: "OPG Ramljak",
          rating: 4.5,
          numReviews: 10,
          description:
            "Vino je puno, harmonično, koncentriranih aroma, nešto izraženije svježine s dosta zrelih tanina. Brižnom dugotrajnom njegom u hrastovim bačvama i blagim ostatkom neprovrelog šećera, sljubljeno je u jedinstveno vino za odabrane trenutke.",
          year: 2020,
          alcoholPercentage: 22.3,
          vineyards: "Srijem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 2,
          category: "Crno vino",
          image: "/images/vino2.jpg",
          price: 110,
          bottleSize: 0.75,
          countInStock: 25,
          sort: "Merlot",
          seller: "OPG Radovanović",
          rating: 5,
          numReviews: 12,
          description: "High quality wine",
          year: 2019,
          alcoholPercentage: 20,
          vineyards: "Varaždin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 2,
          category: "Crno vino",
          image: "/images/vino3.jpg",
          price: 30,
          bottleSize: 1,
          countInStock: 15,
          sort: "Lasin",
          seller: "OPG Belje",
          rating: 4.5,
          numReviews: 10,
          description: "High quality wine",
          year: 2021,
          alcoholPercentage: 17,
          vineyards: "Zadar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 1,
          category: "Crno vino",
          image: "/images/vino4.jpg",
          price: 90,
          bottleSize: 0.75,
          countInStock: 10,
          sort: "Plavina",
          seller: "OPG Skaramuga",
          rating: 4.5,
          numReviews: 10,
          description: "High quality wine",
          year: 2020,
          alcoholPercentage: 18,
          vineyards: "Šibenik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 1,
          category: "Bijelo vino",
          image: "/images/vino5.jpg",
          price: 49,
          bottleSize: 1,
          countInStock: 10,
          sort: "Debit",
          seller: "OPG Ramljak",
          rating: 4.5,
          numReviews: 10,
          description: "High quality wine",
          year: 2018,
          alcoholPercentage: 19,
          vineyards: "Drniš",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
