// var controller = require("../controllers/controller");
// var dealController = require("../controllers/dealController");
// var companyController = require("../controllers/companyController");
// var contactController = require("../controllers/contactController");
// var userController = require("../controllers/userController");

// module.exports = function (app, passport) {
//   //Main
//   app.get("/", isLoggedIn, controller.indexPage);
//   //Users
//   app.get("/user", isLoggedIn, userController.showUser);
//   //Contacts
//   app.get("/contacts", isLoggedIn, contactController.index);
//   app.get("/contacts/:id", isLoggedIn, contactController.show);
//   //Companies
//   app.get("/companies", isLoggedIn, companyController.index);
//   app.get("/companies/:id", isLoggedIn, companyController.show);

//   //Deals
//   app.get("/deals", isLoggedIn, dealController.index);
//   app.get("/deals/new", isLoggedIn, dealController.new);
//   app.get("/deals/:id", isLoggedIn, dealController.show);
//   app.post("/deals/create", isLoggedIn, dealController.create);
//   app.post("/deals/:id/addContact", isLoggedIn, dealController.addContact);

//   function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }

//     res.redirect("/signin");
//   }
// };
