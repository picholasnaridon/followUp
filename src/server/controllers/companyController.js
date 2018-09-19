const models = require("../models");

var passport = require('passport');
require('../config/passport/passport')(passport);

var getToken = function(headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(" ");
        if (parted.length === 2) {
        return parted[1];
        } else {
        return null;
        }
      } else {
      return null;
      }
  }

module.exports = {
  index: function(req, res) {
    models.Company.findAll({ where: { UserId: req.user.id } }).then(function(
      results
    ) {
      res.render("companies/index", { companies: results });
    });
  },
  show: function(req, res) {
    models.Company.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Contact, models.Deal]
    }).then(function(results) {
      res.render("companies/show", { company: results });
    });
  },
  getOne: function(req, res) {
    models.Company.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Deal, models.Contact]
    }).then(function(results) {
      res.json(results);
    });
  },
  getAll: function(req, res) {
    models.Company.findAll({
      include: [models.Deal, models.Contact]
    }).then(function(results) {
      res.json(results);
    });
  }
};
