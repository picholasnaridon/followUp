var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var Contact = sequelize.define(
		'Contact',
		{
			firstName: { type: Sequelize.TEXT, allowNull: true },
			lastName: { type: Sequelize.TEXT, allowNull: true },
			email: { type: Sequelize.TEXT, allowNull: true },
			address1: { type: Sequelize.TEXT, allowNull: true },
			address2: { type: Sequelize.TEXT, allowNull: true },
			city: { type: Sequelize.TEXT, allowNull: true },
			state: { type: Sequelize.TEXT, allowNull: true },
			zip: { type: Sequelize.TEXT, allowNull: true },
			country: { type: Sequelize.TEXT, allowNull: true },
			phone: { type: Sequelize.TEXT, allowNull: true },
			mobile: { type: Sequelize.TEXT, allowNull: true }
		},
		{
			timestamps: false
		}
	);

	Contact.associate = function(models) {
		models.Contact.belongsTo(models.User, {
			onDelete: 'CASCADE',
			foreignKey: {
				allowNull: false
			}
		});
		models.Contact.belongsTo(models.Company, {
			onDelete: 'CASCADE',
			foreignKey: {
				allowNull: false
			}
		});
		models.Contact.belongsToMany(models.Deal, {
			through: models.DealContact
		});
		models.Contact.hasMany(models.Comment);
	};

	return Contact;
};
