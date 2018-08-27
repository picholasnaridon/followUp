const models = require("../models"); // eslint-disable-line no-unused-vars

module.exports = {
  //BASE ROUTES
  signin: function(req, res) {
    res.render("auth/signIn");
  },
  signup: function(req, res) {
    res.render("auth/signUp");
  },
  dashboard: function(req, res) {
    console.log(req.user);

    res.render("index", { user: req.user });
  },
  logout: function(req, res) {
    req.session.destroy(function() {
      res.redirect("/");
    });
  }
};
