var express = require("express");
var router = express.Router();

/* POST logout */
router.post("/", function(req, res, next) {
  req.session = null;
  res.status(200).send("Logged out successfully.");
});

module.exports = router;
