var dealController = require("../controllers/dealController");
var companyController = require("../controllers/companyController");
var contactController = require("../controllers/contactController");
var userController = require("../controllers/userController");

module.exports = function(app, passport) {
  //Users
  app.get("/api/users", userController.users);
  app.get("/api/users/:id", userController.user);
  app.get("/api/users/:id/deals", userController.userDeals);
  app.get("/api/users/:id/contacts", userController.userContacts);
  app.get("/api/users/:id/companies", userController.userCompanies);
  //Contacts
  app.get("/api/contacts", contactController.contacts);
  app.get("/api/contacts/:id", contactController.contact);
  app.get("/api/contacts/:id/deals", contactController.contactsDeals);
  //Companies
  app.get("/api/companies", companyController.companies);
  app.get("/api/companies/:id", companyController.company);
  app.get("/api/companies/:id/contacts", companyController.companyContacts);
  app.get("/api/companies/:id/deals", companyController.companyDeals);
  //Deals
  app.get("/api/deals", dealController.deals);
  app.get("/api/deals/:id", dealController.deal);
  app.get("/api/deals/:id/contacts", dealController.dealContacts);
};
