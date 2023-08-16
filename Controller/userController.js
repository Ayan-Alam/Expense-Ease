const path = require('path');
const Sequelize = require("sequelize");
const user = require('../models/userModel');


exports.getIndex = (req, res, next) => {
	res.sendFile(path.join(__dirname, '../', 'public', "views", 'index.html'));
}

exports.getUser = async (req,res,next)=>{
	try{
		const email = req.body.email;
		const password = req.body.password;
		await user.findOne({where : {email : email}}).then(async(e)=>{
			if(e){
				await user.findOne({where : {email : email,password : password}}).then((users)=>{
					if(users){
					res.send(`<script>alert('User LogIn Successfully'); window.location.href = '/login'</script>`)
					}else{
						res.send(`<script>alert('User not Authorized'); window.location.href = '/login'</script>`)
					}
				}).catch(err =>{console.log(err)});
			}else{
				res.send(`<script>alert('User Not Found'); window.location.href = '/login'</script>`)
			}
		})
	}catch (err){
		console.log(err);
	}
}

exports.addUser = async (req, res, next) => {
	try {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		await user.findOne({where : {email : email}}).then(async (users) =>{
			if (users){
				res.send(`<script>alert('User Already Exist'); window.location.href = '/login'</script>`)
			} else {
					await user.create({
						name: name,
						email: email,
						password: password,
					})
					res.redirect('/login');
				}
			}
		).catch((err) => console.log(err));
	} catch (err) {
        console.log(err);
	}
}


