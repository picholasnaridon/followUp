const models = require("../models");

module.exports = {
  // GET COMPANY
  company: function(req, res) {
    models.Company.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  },
  // GET ALL COMPANIES
  companies: function(req, res) {
    models.Company.findAll({}).then(function(results) {
      res.json(results);
    });
  },

  // GET COMPANY CONTACTS
  companyContacts: function(req, res) {
    models.Company.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Contact]
    }).then(function(results) {
      res.json(results);
    });
  },

  // GET COMPANY DEALS
  companyDeals: function(req, res) {
    models.Contact.findAll({
      where: { CompanyId: req.params.id },
      include: [models.Deal]
    }).then(function(contacts) {
      var deals = [];
      contacts.forEach(function(contact) {
        deals.push(contact.Deals);
      });
      res.json(contacts);
    });
  }
};
