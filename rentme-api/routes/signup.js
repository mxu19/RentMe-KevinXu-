var express = require("express");
var router = express.Router();
const models = require("../models/db");

/* POST signup */
router.post("/", async function(req, res, next) {
  const signUpRequest = req.body;
  if (
    !signUpRequest ||
    !signUpRequest.firstName ||
    !signUpRequest.lastName ||
    !signUpRequest.email ||
    !signUpRequest.password
  ) {
    return res.status(400).send("Missing sign up details.");
  }

  try {
    await models.User.create({
      firstName: signUpRequest.firstName,
      lastName: signUpRequest.lastName,
      email: signUpRequest.email,
      password: signUpRequest.password
    });

    return res.status(200).send("User signed up successfully.");
  } catch (exception) {
    return res.status(500).send("Error incurred.");
  }
});

module.exports = router;
