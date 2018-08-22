var controller = require('../controllers/controller')

module.exports = function (app) {

  app.get("/api/deals", controller.deals)

  app.get("/api/users", controller.users)
  app.get("/api/contacts", controller.contacts)
  app.get("/api/companies", controller.companies)
  app.get("/api/users/:id/deals", controller.userDeals)
  app.get("/api/users/:id/contacts", controller.userContacts)
  app.get("/api/users/:id/companies", controller.userCompanies)
  app.get("/api/deals/:id/contacts", controller.dealContacts)
  app.get("/api/companies/:id/contacts", controller.companyContacts)
  app.get("/api/companies/:id/deals", controller.companyDeals)


};
