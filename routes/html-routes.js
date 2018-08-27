var controller = require("../controllers/controller");
var dealController = require("../controllers/dealController");
var companyController = require("../controllers/companyController");
var contactController = require("../controllers/contactController");
var userController = require("../controllers/userController");

module.exports = function(app) {
  //Main
  app.get("/", controller.indexPage);
  //Users
  app.get("/user", userController.showUser);
  //Contacts
  app.get("/contacts", contactController.showContacts);
  app.get("/contacts/:id", contactController.showContact);
  //Companies

  //Deals
  app.get("/deals", dealController.showDeals);
  app.get("/deals/:id", dealController.showDeal);
  app.get("/deals/addDeal", dealController.addDeal);
  app.post("/deals/createDeal", dealController.createDeal);
  app.post("/deals/:id/addContact", dealController.addContact);
};
