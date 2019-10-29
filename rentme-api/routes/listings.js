var express = require("express");
var router = express.Router();
const models = require("../models/db");
const UserRole = require("../constants/userRole");
const isSessionUserAdmin = require("../utils/requestSession");

/* GET listings */
router.get("/", function(req, res, next) {
  models.Listing.findAll({
    where: {
      archivedAt: null
    }
  }).then(listings => {
    return res.json(listings);
  });
});

/* GET listings/{id} */
router.get("/:id", function(req, res, next) {
  // Validate user is Admin
  if (!isSessionUserAdmin(req)) {
    return res.status(401).send("");
  }

  const listingId = req.params.id;
  models.Listing.findByPk(listingId)
    .then(listing => {
      return res.json(listing);
    })
    .catch(error => {
      return res.status(400).send("Could not find listing.");
    });
});

/* POST listings */
router.post("/", async function(req, res, next) {
  // Validate user is Admin
  if (!isSessionUserAdmin(req)) {
    return res.status(401).send("");
  }

  const createListingRequest = req.body;

  if (
    !createListingRequest ||
    !createListingRequest.name ||
    createListingRequest.price <= 0 ||
    !createListingRequest.imageUrl ||
    !createListingRequest.description ||
    !createListingRequest.expiryDate
  ) {
    return res.status(400).send("Missing new listing details.");
  }

  try {
    await models.Listing.create({
      name: createListingRequest.name,
      price: createListingRequest.price,
      imageUrl: createListingRequest.imageUrl,
      description: createListingRequest.description,
      expiryDate: createListingRequest.expiryDate
    });

    return res.send("Listing has been created successfully.");
  } catch (exception) {
    return res.status(500).send("Error incurred.");
  }
});

/* PUT listings */
router.put("/:id", async function(req, res, next) {
  // Validate user is Admin
  if (!isSessionUserAdmin(req)) {
    return res.status(401).send("");
  }
  const listingId = req.params.id;
  const updateListingRequest = req.body;

  if (
    !updateListingRequest ||
    !updateListingRequest.name ||
    updateListingRequest.price <= 0 ||
    !updateListingRequest.imageUrl ||
    !updateListingRequest.description ||
    !updateListingRequest.expiryDate
  ) {
    return res.status(400).send("Missing listing details to update.");
  }
  try {
    var listing = await models.Listing.findByPk(listingId);
    listing.update({
      name: updateListingRequest.name,
      price: updateListingRequest.price,
      imageUrl: updateListingRequest.imageUrl,
      description: updateListingRequest.description,
      expiryDate: updateListingRequest.expiryDate
    });

    return res.send("Listing has been updated successfully.");
  } catch (exception) {
    return res.status(500).send("Error incurred.");
  }
});

/* DELETE listings/{id} */
router.delete("/:id", function(req, res, next) {
  const listingIdToArchive = req.params.id;

  // Validate user is Admin
  if (!isSessionUserAdmin(req)) {
    return res.status(401).send("");
  }
  models.Listing.findByPk(listingIdToArchive)
    .then(listing => {
      listing.update({
        archivedAt: new Date()
      });

      return res.send("Listing successfully archived.");
    })
    .catch(error => {
      return res.status(400).send("Could not find listing.");
    });
});

module.exports = router;
