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
      stage: req.body.stage,
      status: req.body.status
    }).then(function (deal) {
      res.json(deal)
    });
  },
  update: function (req, res) {
    models.Deal.update({

    })
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
              email: req.body.email,
              address1: req.body.address1,
              address2: req.body.address2,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              phone: req.body.phone,
              mobile: req.body.mobile,
              UserId: req.body.userId,
              CompanyId: company.id
            }).then(function (contact) {
              company.addDeals([deal]);
              return deal.addContacts([contact]);
            });
          })
          .then(function (results) {
            res.json(results)
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
  },
  changeStage: function (req, res) {
    console.log(req.body)
    models.Deal.update(
      { stage: req.body.stage },
      {
        where:
          { id: req.params.id }
      }
    ).then(function (results) {
      res.json(results)
    })
  }
};
