const models = require("../models");

module.exports = {
  // SHOW CONTACTS
  index: function (req, res) {
    models.Contact.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (results) {
      res.render("contacts/index", { contacts: results });
    });
  },
  show: function (req, res) {
    console.log(req.user);
    models.Contact.findOne({
      where: { id: req.params.id },
      include: [models.Deal, models.Company]
    }).then(function (results) {
      res.render("contacts/show", { contact: results });
    });
  },
  getOne: function (req, res) {
    models.Contact.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Company, models.Deal]
    }).then(function (results) {
      res.json(results);
    });
  },
  getAll: function (req, res) {
    models.Contact.findAll({
      include: [models.Company, models.Deal]
    }).then(function (results) {
      res.json(results);
    });
  }
};
