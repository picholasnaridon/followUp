const models = require("../models"); // eslint-disable-line no-unused-vars

module.exports = {
  //BASE ROUTES
 

  logout: function (req, res) {
    req.session.destroy(function () {
      res.redirect("/");
    });
  }
};
