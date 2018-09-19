var authController = require("../controllers/authController");

var passport = require('passport');
var settings = require('../config/passport/settings');
require('../config/passport/passport')(passport);
var jwt = require('jsonwebtoken');


module.exports = function (app) {

  app.get("/api/logout", authController.logout);

  app.post('/api/signup', authController.signup);

  app.post('/api/signin', authController.signin);

  // app.get('/api/user', authController.currentUser)

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/api/signin");
  }
};

