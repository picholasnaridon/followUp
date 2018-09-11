var dealController = require("../controllers/dealController");
var companyController = require("../controllers/companyController");
var contactController = require("../controllers/contactController");
var userController = require("../controllers/userController");

module.exports = function (app, passport) {
  //Users
  app.get("/api/users", userController.users);
  app.get("/api/users/:id", userController.user);
  app.get("/api/users/:id/deals", userController.userDeals);
  app.get("/api/users/:id/contacts", userController.userContacts);
  app.get("/api/users/:id/companies", userController.userCompanies);
  //Contacts
  app.get("/api/contacts", contactController.getAll);
  app.get("/api/contacts/:id", contactController.getOne);
  //CompaniesgetOne
  app.get("/api/companies", companyController.getAll);
  app.get("/api/companies/:id", companyController.getOne);
  //Deals
  app.get("/api/deals", dealController.getAll);
  app.get("/api/deals/:id", dealController.getOne);
  app.put("/api/deals/:id/changeStage", dealController.changeStage);

  app.post("/api/deals/create", dealController.create);
  app.post("/api/deals/:id/addContact", dealController.addContact);
};
