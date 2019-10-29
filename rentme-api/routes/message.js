var express = require("express");
var router = express.Router();
const models = require("../models/db");
const UserRole = require("../constants/userRole");
const isSessionUserAdmin = require("../utils/requestSession");

/* GET listings */
router.get("/", function(req, res, next) {
  models.Message.findAll({
    where: { markAsRead: false }
  }).then(messages => {
    return res.json(messages);
  });
});

/* POST listings */
router.post("/", async function(req, res, next) {
  if (!req.body) {
    return res.status(400).send("Missing new listing details.");
  }

  const { userId, itemId, message } = req.body;

  if (!userId || !itemId || !message) {
    return res.status(400).send("Missing new listing details.");
  }

  try {
    await models.Message.create({
      userId,
      itemId,
      message,
      markAsRead: false
    });
    return res.send("Listing has been created successfully.");
  } catch (exception) {
    return res.status(500).send("Error incurred.");
  }
});

/* Edit listings */
router.put("/:id", async function(req, res, next) {
  // Validate user is Admin
  if (!isSessionUserAdmin(req)) {
    return res.status(401).send("");
  }

  const msgId = req.params.id;

  if (!msgId) {
    return res.status(400).send("Missing new listing details.");
  }

  models.Message.findByPk(msgId)
    .then(msg => {
      msg.update({ markAsRead: true });
      return res.send("Message marked as read.");
    })
    .catch(error => {
      return res.status(400).send("Error reading message.");
    });
});

module.exports = router;
