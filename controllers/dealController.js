const models = require("../models");

module.exports = {
  // SHOW DEALS
  showDeals: function(req, res) {
    models.Deal.findAll({
      where: {
        id: req.user.id
      }
    }).then(function(results) {
      res.render("deals/index", { deals: results });
    });
  },

  // SHOW DEAL
  showDeal: function(req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Contact]
    }).then(function(results) {
      res.render("deals/show", { deal: results });
    });
  },

  // ADD DEAL
  newdeal: function(req, res) {
    res.render("deals/create");
  },

  // ADD CONTACT TO DEAL
  addContact: function(req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(deal) {
        return models.Contact.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          UserId: 1
        }).then(function(contact) {
          return deal.addContacts([contact]);
        });
      })
      .then(function() {
        res.redirect(`/deals/${req.params.id}`);
      });
  },

  // GET DEAL
  deal: function(req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  },

  // GET DEALS
  deals: function(req, res) {
    models.Deal.findAll({}).then(function(results) {
      res.json(results);
    });
  },

  // CREATE DEAL
  createDeal: function(req, res) {
    models.Deal.create(
      {
        name: req.body.name,
        UserId: 1,
        contacts: [
          { firstName: req.body.firstName, lastName: req.body.lastName }
        ]
      },
      {
        include: [
          {
            model: models.Contact,
            association: models.ContactDeals
          }
        ]
      }
    );
    res.redirect("/deals");
  },

  //GET DEAL CONTACTS
  dealContacts: function(req, res) {
    models.Deal.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Contact]
    }).then(function(results) {
      res.json(results);
    });
  }
};
