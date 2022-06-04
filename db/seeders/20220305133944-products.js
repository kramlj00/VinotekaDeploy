"use strict";

module.exports = {
  up: async (queryInterface, sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("Products", [
        {
          seller_id: 3,
          category: "Crno vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino1_kit1qi.jpg",
          price: 100,
          bottleSize: 1,
          countInStock: 0,
          sort: "Cabernet Saugvinon",
          seller: "OPG Galić",
          rating: 4.5,
          numReviews: 10,
          description:
            "Vino je puno, harmonično, koncentriranih aroma, nešto izraženije svježine s dosta zrelih tanina. Brižnom dugotrajnom njegom u hrastovim bačvama i blagim ostatkom neprovrelog šećera, sljubljeno je u jedinstveno vino za odabrane trenutke.",
          year: 2020,
          alcoholPercentage: 9,
          vineyards: "Srijem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 2,
          category: "Crno vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino4_isjhel.jpg",
          price: 110,
          bottleSize: 0.75,
          countInStock: 25,
          sort: "Merlot",
          seller: "Korlat",
          rating: 5,
          numReviews: 12,
          description:
            "Iz benkovačkog vinogorja, s položaja Korlat, potječe i ovo osebujno vino sjajne, tamno crvene boje, njegovano u hrastovim bačvama. Snažne, bogate strukture, podržano aromama zrelog crvenog voća trešnje i maline te dodatno harmonizirano diskretnim začinskim aromama.",
          year: 2019,
          alcoholPercentage: 12,
          vineyards: "Benkovac",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category: "Crno vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino2_om7ygj.jpg",
          price: 30,
          bottleSize: 1,
          countInStock: 15,
          sort: "Lasin",
          seller: "OPG Galić",
          rating: 4.5,
          numReviews: 10,
          description:
            "Aromatično, lagano, pitko vino, slankaste morske mineralnosti.",
          year: 2021,
          alcoholPercentage: 9,
          vineyards: "Drniš",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category: "Crno vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino3_nbzuls.jpg",
          price: 90,
          bottleSize: 0.75,
          countInStock: 10,
          sort: "Plavina",
          seller: "OPG Galić",
          rating: 4.5,
          numReviews: 10,
          description:
            "Ručno ubrano grožđe iz vrhunskih vinograda. Izbor grožđa u podrumu. Kontrolirana fermentacija u čeličnim tankovima i drvenim posudama.",
          year: 2020,
          alcoholPercentage: 8,
          vineyards: "Šibenik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 2,
          category: "Bijelo vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino3_nbzuls.jpg",
          price: 49,
          bottleSize: 1,
          countInStock: 10,
          sort: "Debit",
          seller: "Korlat",
          rating: 4.5,
          numReviews: 10,
          description:
            "Obitelj Bibić je zaslužna za promjenu mišljenja vinskog javnog mijenja kad je u pitanju sorta Debit. Vino žive voćnosti i osvježavajućih aroma jabuke i začinskih trava, mineralno slankastog završetka.",
          year: 2018,
          alcoholPercentage: 9,
          vineyards: "Zadar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category: "Crno vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino1_kit1qi.jpg",
          price: 100,
          bottleSize: 1,
          countInStock: 0,
          sort: "Cabernet Saugvinon",
          seller: "OPG Galić",
          rating: 4.5,
          numReviews: 10,
          description:
            "Vino je puno, harmonično, koncentriranih aroma, nešto izraženije svježine s dosta zrelih tanina. Brižnom dugotrajnom njegom u hrastovim bačvama i blagim ostatkom neprovrelog šećera, sljubljeno je u jedinstveno vino za odabrane trenutke.",
          year: 2020,
          alcoholPercentage: 10,
          vineyards: "Drniš",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category: "Crno vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino2_om7ygj.jpg",
          price: 100,
          bottleSize: 1,
          countInStock: 0,
          sort: "Cabernet Saugvinon",
          seller: "OPG Galić",
          rating: 4.5,
          numReviews: 10,
          description:
            "Vino je puno, harmonično, koncentriranih aroma, nešto izraženije svježine s dosta zrelih tanina. Brižnom dugotrajnom njegom u hrastovim bačvama i blagim ostatkom neprovrelog šećera, sljubljeno je u jedinstveno vino za odabrane trenutke.",
          year: 2020,
          alcoholPercentage: 9,
          vineyards: "Srijem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 2,
          category: "Crno vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino4_isjhel.jpg",
          price: 110,
          bottleSize: 0.75,
          countInStock: 25,
          sort: "Merlot",
          seller: "Korlat",
          rating: 5,
          numReviews: 12,
          description:
            "Iz benkovačkog vinogorja, s položaja Korlat, potječe i ovo osebujno vino sjajne, tamno crvene boje, njegovano u hrastovim bačvama. Snažne, bogate strukture, podržano aromama zrelog crvenog voća trešnje i maline te dodatno harmonizirano diskretnim začinskim aromama.",
          year: 2019,
          alcoholPercentage: 12,
          vineyards: "Benkovac",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category: "Crno vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino2_om7ygj.jpg",
          price: 30,
          bottleSize: 1,
          countInStock: 15,
          sort: "Lasin",
          seller: "OPG Galić",
          rating: 4.5,
          numReviews: 10,
          description:
            "Aromatično, lagano, pitko vino, slankaste morske mineralnosti.",
          year: 2021,
          alcoholPercentage: 9,
          vineyards: "Drniš",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category: "Crno vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino3_nbzuls.jpg",
          price: 90,
          bottleSize: 0.75,
          countInStock: 10,
          sort: "Plavina",
          seller: "OPG Galić",
          rating: 4.5,
          numReviews: 10,
          description:
            "Ručno ubrano grožđe iz vrhunskih vinograda. Izbor grožđa u podrumu. Kontrolirana fermentacija u čeličnim tankovima i drvenim posudama.",
          year: 2020,
          alcoholPercentage: 8,
          vineyards: "Šibenik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 2,
          category: "Bijelo vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino2_om7ygj.jpg",
          price: 49,
          bottleSize: 1,
          countInStock: 10,
          sort: "Debit",
          seller: "Korlat",
          rating: 4.5,
          numReviews: 10,
          description:
            "Obitelj Bibić je zaslužna za promjenu mišljenja vinskog javnog mijenja kad je u pitanju sorta Debit. Vino žive voćnosti i osvježavajućih aroma jabuke i začinskih trava, mineralno slankastog završetka.",
          year: 2018,
          alcoholPercentage: 9,
          vineyards: "Zadar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          seller_id: 3,
          category: "Crno vino",
          image:
            "https://res.cloudinary.com/kristina1950/image/upload/v1651483710/vino2_om7ygj.jpg",
          price: 100,
          bottleSize: 1,
          countInStock: 0,
          sort: "Cabernet Saugvinon",
          seller: "OPG Galić",
          rating: 4.5,
          numReviews: 10,
          description:
            "Vino je puno, harmonično, koncentriranih aroma, nešto izraženije svježine s dosta zrelih tanina. Brižnom dugotrajnom njegom u hrastovim bačvama i blagim ostatkom neprovrelog šećera, sljubljeno je u jedinstveno vino za odabrane trenutke.",
          year: 2020,
          alcoholPercentage: 10,
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
