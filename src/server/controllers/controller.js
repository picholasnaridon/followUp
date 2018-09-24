const models = require('../models');

module.exports = {
	indexPage: function(req, res) {
		res.render('index', {
			user: {}
		});
	}
};
