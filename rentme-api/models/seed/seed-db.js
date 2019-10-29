"use strict";

const models = require("../db");

module.exports = {
  insert: () => {
    models.Listing.bulkCreate([
      {
        name: "Mac Book",
        price: 100,
        imageUrl: "https://i.imgur.com/aNtHHhc.jpg",
        description: "Black",
        expiryDate: "16 Nov, 2019"
      },
      {
        name: "Mac Book",
        price: 100,
        imageUrl: "https://i.imgur.com/aNtHHhc.jpg",
        description: "Black",
        expiryDate: "16 Nov, 2019"
      },
      {
        name: "BMW M3",
        price: 800,
        imageUrl: "https://i.imgur.com/JHnn4qF.jpg",
        description: "Black",
        expiryDate: "19 Nov, 2019"
      },
      {
        name: "Moblie Phone",
        price: 200,
        imageUrl: "https://i.imgur.com/KHs8TjZ.jpg",
        description: "Black",
        expiryDate: "25 Nov, 2019"
      },
      {
        name: "CD",
        price: 50,
        imageUrl: "https://i.imgur.com/HbRQih1.jpg",
        description: "Black",
        expiryDate: "30 Nov, 2019"
      }
    ]);
    models.User.bulkCreate([
      {
        firstName: "Alfred",
        lastName: "Tang",
        email: "alfre.tang@gmail.com",
        password: "$2b$10$KMUJAzqItl.Fq41SjpVkIONFtpMRehQPb9oxm8UHOhLNI5mljmWtC"
      }
    ]);
  }
};
