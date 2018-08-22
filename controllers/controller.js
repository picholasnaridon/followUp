const models = require("../models");

module.exports = {
  //BASE ROUTES
  users: function(req, res) {
    models.User.findAll({}).then(function(results) {
      res.json(results);
    });
  },
  deals: function(req, res) {
    models.Deal.findAll({}).then(function(results) {
      res.json(results);
    });
  },
  contacts: function(req, res) {
    models.Contact.findAll({}).then(function(results) {
      res.json(results);
    });
  },
  companies: function(req, res) {
    models.Company.findAll({}).then(function(results) {
      res.json(results);
    });
  },

  //USER ROUTES
  userDeals: function(req, res) {
    models.User.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Deal]
    }).then(function(results) {
      res.json(results);
    });
  },
  userContacts: function(req, res) {
    models.User.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Contact]
    }).then(function(results) {
      res.json(results);
    });
  },
  userCompanies: function(req, res) {
    models.Contact.findOne({
      where: {
        UserId: req.params.id
      },
      include: [models.Company]
    }).then(function(results) {
      res.json(results);
    });
  },

  //DEAL ROUTES
  dealContacts: function(req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Contact]
    }).then(function(results) {
      res.json(results);
    });
  },

  //CONTACT ROUTES
  contactsDeals: function(req, res) {
    models.Contact.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Deal]
    }).then(function(results) {
      res.json(results);
    });
  },

  //COMPANY ROUTES
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
