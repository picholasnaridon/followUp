const models = require("../models"); // eslint-disable-line no-unused-vars

module.exports = {
  //BASE ROUTES
  signin: function (req, res) {
    res.send("test")
  },
  signup: function (req, res) {
    res.send("test");
  },
  dashboard: function (req, res) {
    res.send("index", { user: req.user });
  },
  logout: function (req, res) {
    req.session.destroy(function () {
      res.redirect("/");
    });
  }
};
