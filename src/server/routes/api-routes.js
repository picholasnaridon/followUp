var dealController = require('../controllers/dealController');
var companyController = require('../controllers/companyController');
var contactController = require('../controllers/contactController');
var userController = require('../controllers/userController');
var commentController = require('../controllers/commentController');
var updateController = require('../controllers/updateController');
var passport = require('passport');
var settings = require('../config/passport/settings');
require('../config/passport/passport')(passport);
var jwt = require('jsonwebtoken');

module.exports = function(app) {
	//Users
	app.get('/api/user', passport.authenticate('jwt', { session: false }), userController.currentUser);
	app.get('/api/users', userController.users);
	app.get('/api/users/:id', userController.user);
	app.get('/api/users/:id/deals', userController.userDeals);
	app.get('/api/users/:id/contacts', userController.userContacts);
	app.get('/api/users/:id/companies', userController.userCompanies);

	//Comment
	app.get('/api/comments/getAll/:id', commentController.getAll);
	app.get('/api/comments/deals/:id', commentController.getDealComments);
	app.get('/api/comments/contacts/:id', commentController.getContactComments);
	app.post('/api/comments/deals/add', commentController.addDealComment);
	app.post('/api/comments/contacts/add', commentController.addContactComment);

	//Contacts
	app.get('/api/contacts', contactController.getAll);
	app.get('/api/contacts/:id', contactController.getOne);
	app.put('/api/contacts/:id/edit', contactController.edit);

	//Companies
	app.get('/api/companies', companyController.getAll);
	app.get('/api/companies/:id', companyController.getOne);

	//Deals
	app.get('/api/deals', dealController.getAll);
	app.get('/api/deals/:id', dealController.getOne);
	app.put('/api/deals/:id/changeStage', dealController.changeStage);
	app.put('/api/deals/:id/edit', dealController.edit);
	app.post('/api/deals/create', dealController.create);
	app.post('/api/deals/:id/addContact', dealController.addContact);

	//Updates
	app.get('/api/updates/getAll/:id', updateController.getAll);
	app.get('/api/updates/deal/:id', updateController.getDealUpdates);
	app.get('/api/updates/closeTime/:id', updateController.closeTime);
	app.post('/api/updates/deal/add', updateController.createDealUpdate);
};
