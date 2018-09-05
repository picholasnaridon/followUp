const models = require("../models");

module.exports = {
  // INDEX
  indexPage: function(req, res) {
    res.render("index", {
      user: {}
    });
  }
};
