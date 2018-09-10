const models = require("../models");

module.exports = {
  // SHOW DEALS
  index: function (req, res) {
    models.Deal.findAll({
      where: {
        UserId: req.user.id
      },
      include: [models.Contact, models.Company]
    }).then(function (results) {
      console.log(results);
      res.json(results)
    });
  },
  show: function (req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Contact, models.Company]
    }).then(function (results) {
      res.json(results)
    });
  },
  new: function (req, res) {
    res.json(results)
  },
  create: function (req, res) {
    models.Deal.create({
      name: req.body.name,
      UserId: req.body.UserId,
      amount: req.body.amount,
      status: req.body.status
    }).then(function (deal) {
      res.json(deal)
    });
  },
  addContact: function (req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (deal) {
      models.sequelize.transaction(function (t) {
        return models.Company.findOrCreate({
          where: {
            name: req.body.company,
            UserId: req.body.userId
          },
          defaults: {
            name: req.body.company,
            UserId: req.body.userId
          }
        })
          .spread(function (company, created) {
            console.log(created);
            return models.Contact.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              UserId: req.body.userId,
              CompanyId: company.id
            }).then(function (contact) {
              company.addDeals([deal]);
              return deal.addContacts([contact]);
            });
          })
          .then(function () {
            res.json(contact)
          });
      });
    });
  },
  getOne: function (req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Company, models.Contact]
    }).then(function (results) {
      res.json(results);
    });
  },
  getAll: function (req, res) {
    models.Deal.findAll({ include: [models.Contact, models.Company] }).then(
      function (results) {
        res.json(results);
      }
    );
  }
};
