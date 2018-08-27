var controller = require("../controllers/controller");
var dealController = require("../controllers/dealController");
var companyController = require("../controllers/companyController");
var contactController = require("../controllers/contactController");
var userController = require("../controllers/userController");

module.exports = function(app, passport) {
  //Main
  app.get("/", isLoggedIn, controller.indexPage);
  //Users
  app.get("/user", isLoggedIn, userController.showUser);
  //Contacts
  app.get("/contacts", isLoggedIn, contactController.showContacts);
  app.get("/contacts/:id", isLoggedIn, contactController.showContact);
  //Companies

  //Deals
  app.get("/deals", isLoggedIn, dealController.showDeals);
  app.get("/deals/newdeal", isLoggedIn, dealController.newdeal);
  app.get("/deals/:id", isLoggedIn, dealController.showDeal);
  app.post("/deals/createDeal", isLoggedIn, dealController.createDeal);
  app.post("/deals/:id/addContact", isLoggedIn, dealController.addContact);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signin");
  }
};
