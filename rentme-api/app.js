var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cookieSession = require("cookie-session");
var bodyParser = require("body-parser");

var signupRouter = require("./routes/signup");
var loginRouter = require("./routes/login");
var listingsRouter = require("./routes/listings");
var logoutRouter = require("./routes/logout");
var messageRouter = require("./routes/message");

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ type: "application/json" }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/listings", listingsRouter);
app.use("/logout", logoutRouter);
app.use("/messages", messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
