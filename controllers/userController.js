const models = require("../models");

module.exports = {
  //SHOW USER
  showUser: function(req, res) {
    models.User.findOne({
      where: { id: req.params.id }
    }).then(function(result) {
      res.render("user", { user: result });
    });
  },
  //GET USER
  user: function(req, res) {
    models.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  },

  // GET USERS
  users: function(req, res) {
    models.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  },

  //GET USER DEALS
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

  // GET USER CONTACTS
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

  // GET USER COMPANIES
  userCompanies: function(req, res) {
    models.Contact.findOne({
      where: {
        UserId: req.params.id
      },
      include: [models.Company]
    }).then(function(results) {
      res.json(results);
    });
  }
};
