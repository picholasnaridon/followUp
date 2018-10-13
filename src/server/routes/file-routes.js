var dealController = require('../controllers/dealController');
var companyController = require('../controllers/companyController');
var contactController = require('../controllers/contactController');
var userController = require('../controllers/userController');
var commentController = require('../controllers/commentController');
var updateController = require('../controllers/updateController');
var models = require('../models');
var cloudinary = require('cloudinary');
var fs = require('fs');

cloudinary.config({
	cloud: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});
var multer = require('multer');
var upload = multer({ dest: '../uploads' });

module.exports = function(app) {
	app.post('/api/contacts/:id/addPhoto', upload.single('avatar'), function(req, res) {
		cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
			if (error) {
				console.log(error);
			}
			fs.unlink('../uploads/' + req.file.filename, (err) => {
				if (err) {
					console.log('failed to delete local image:' + err);
				} else {
					console.log('successfully deleted local image');
				}
			});
			models.Contact
				.update(
					{
						imageUrl: result.url
					},
					{
						where: { id: req.params.id }
					}
				)
				.then(function(results) {
					res.json({ imageUrl: result.url });
				});
		});
	});
};
