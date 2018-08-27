const models = require("../models");

module.exports = {
  // SHOW DEALS
  index: function(req, res) {
    models.Deal.findAll({
      where: {
        UserId: req.user.id
      },
      include: [models.Contact, models.Company]
    }).then(function(results) {
      console.log(results);
      res.render("deals/index", { deals: results });
    });
  },
  show: function(req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Contact, models.Company]
    }).then(function(results) {
      res.render("deals/show", { deal: results });
    });
  },
  newdeal: function(req, res) {
    res.render("deals/create");
  },
  addContact: function(req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(deal) {
      return models.Company.create({
        name: req.body.company
      })
        .then(function(company) {
          return models.Contact.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            UserId: req.user.id,
            CompanyId: company.id
          }).then(function(contact) {
            company.addDeals([deal]);
            return deal.addContacts([contact]);
          });
        })
        .then(function() {
          res.redirect(`/deals/${req.params.id}`);
        });
    });
  },
  getOne: function(req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Company, models.Contact]
    }).then(function(results) {
      res.json(results);
    });
  },
  getAll: function(req, res) {
    models.Deal.findAll({ include: [models.Contact, models.Company] }).then(
      function(results) {
        res.json(results);
      }
    );
  },
  create: function(req, res) {
    models.Deal.create({
      name: req.body.name,
      UserId: req.user.id,
      amount: req.body.amount,
      status: req.body.status
    }).then(function(deal) {
      res.redirect(`/deals/${deal.id}`);
    });
  }
};
