const models = require("../models");

module.exports = {
  // SHOW CONTACTS
  showContacts: function(req, res) {
    models.Contact.findAll({
      where: {
        id: req.user.id
      }
    }).then(function(results) {
      res.render("contacts/index", { contacts: results });
    });
  },

  // SHOW CONTACT
  showContact: function(req, res) {
    console.log(req.user);

    models.Contact.findOne({
      where: { id: req.params.id },
      include: [models.Deal]
    }).then(function(results) {
      res.render("contacts/show", { contact: results });
    });
  },

  // GET CONTACT
  contact: function(req, res) {
    models.Contact.findOne({}).then(function(results) {
      res.json(results);
    });
  },
  // GET CONTACTS
  contacts: function(req, res) {
    models.Contact.findAll({}).then(function(results) {
      res.json(results);
    });
  },

  //GET CONTACT DEALS
  contactsDeals: function(req, res) {
    models.Contact.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Deal]
    }).then(function(results) {
      res.json(results);
    });
  }
};
