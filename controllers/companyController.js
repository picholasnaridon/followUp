const models = require("../models");

module.exports = {
  index: function(req, res) {
    models.Company.findAll({}).then(function(results) {
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
