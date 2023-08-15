const path = require('path');
const Sequelize = require("sequelize");
const user = require('../models/userModel');

exports.getIndex = (req, res, next) => {
	res.sendFile(path.join(__dirname, '../', 'public', "views", 'index.html'));
}

exports.addUser = async (req, res, next) => {
	try {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		await user.create({
			name: name,
			email: email,
			password: password,
		})
		res.redirect('/login');
	} catch (err) {
        res.status(500).json({err:'user already exist'});
	}
}
