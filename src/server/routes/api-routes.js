var dealController = require("../controllers/dealController");
var companyController = require("../controllers/companyController");
var contactController = require("../controllers/contactController");
var userController = require("../controllers/userController");
var notesController = require("../controllers/notesController")

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
  app.put("/api/contacts/:id/edit", contactController.edit);
  //CompaniesgetOne
  app.get("/api/companies", companyController.getAll);
  app.get("/api/companies/:id", companyController.getOne);
  //Deals
  app.get("/api/deals", dealController.getAll);
  app.get("/api/deals/:id", dealController.getOne);
  app.put("/api/deals/:id/changeStage", dealController.changeStage);
  app.put("/api/deals/:id/edit", dealController.edit);

  app.get("/api/deals/notes", notesController.getDealNotes)
  app.get("/api/contacts/notes", notesController.getContactNotes)
  app.post("/api/deals/note/create", notesController.createDealNote)
  app.post("/api/contacts/note/create", notesController.createContactNote)


  app.post("/api/deals/create", dealController.create);
  app.post("/api/deals/:id/addContact", dealController.addContact);
};
