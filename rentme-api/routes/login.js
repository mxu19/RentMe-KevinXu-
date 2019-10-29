var express = require("express");
var router = express.Router();
const models = require("../models/db");
const UserRole = require("../constants/userRole");

/* POST login */
router.post("/", async function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  // Check if login is site owner
  if (username === "admin" && password === "123456") {
    req.session.user = { isAuthenticated: true, role: UserRole.Admin };
    return res.json({ role: UserRole.Admin });
  }
  // Check if login is a valid user
  else if (username && password) {
    let user = await models.User.findOne({ where: { email: username } });
    if (user && (await user.validatePassword(password))) {
      req.session.user = { isAuthenticated: true, role: UserRole.User };
      console.log(user.id);
      return res.json({ role: UserRole.User, userId: user.id });
    }
  }

  res.status(400).send("Bad login.");
  return res.status(400).send("Bad login.");
});

module.exports = router;
