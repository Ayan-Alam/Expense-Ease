const path = require('path');
const Sequelize = require("sequelize");
const sequelize = require('../utils/database');
const expense = require('../models/expenseModel');
const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const Papa = require("papaparse");

function generateAccessToken(id) {
	return jwt.sign({ userId: id },process.env.TOKEN);
  }
  
exports.isPremium = async (req,res)=>{
	try {
	  if (req.user.ispremiumuser) {
		return res.json({ ispremiumuser: true });
	  }
	} catch (error) {
	  console.log(error);
	}
}

exports.getIndex = (req, res, next) => {
	res.sendFile(path.join(__dirname, '../', 'public', "views", 'index.html'));
}

exports.alluser = async(req,res,next)=>{
	try {
	user.findAll({
		attributes: [
		  [sequelize.col("name"), "name"],
		  [sequelize.col("totalExpenses"), "totalExpenses"],
		],
		order: [[sequelize.col("totalExpenses"), "DESC"]],
	  }).then((users) => {
		const result = users.map((user) => ({
		  name: user.getDataValue("name"),
		  totalExpenses: user.getDataValue("totalExpenses"),
		}));
		res.send(JSON.stringify(result));
	  });
	} catch (error) {
	  console.log(error);
	}
}

exports.getUser = async (req,res,next)=>{
	try{
		const email = req.body.loginEmail;
		const password = req.body.loginPassword;
		await user.findOne({where : {email : email}}).then((e)=>{
			if(e){
				bcrypt.compare(password,e.password,(err,result)=>{
					if(err){
						console.log(err);
					}
					if(result == true){
						return res.status(200).json({
							success: true,
							message: "Login Successful!",
							token: generateAccessToken(e.id),
						  })
						}else{
							return res.status(404).json({
								success: false,
								message: "Password is incorrect!",
							  });
					}
				})
			}else{
				return res.status(404).json({
					success: false,
					message: "User not Found!",
				  });
			}
		})
	}catch (err){
		console.log(err);
	}
}

exports.createUser = async (req, res, next) => {
	try {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		await user.findOne({where : {email : email}}).then((users) =>{
			if (users){
				res.send(`<script>alert('User Already Exist'); window.location.href = '/'</script>`)
			} else {
				bcrypt.hash(password,10,async(err,hash)=>{
					await user.create({
						name: name,
						email: email,
						password: hash,
					})
					res.send(`<script>alert('User Created Successfully'); window.location.href = '/'</script>`);
				})
			}
	}).catch((err) => console.log(err));
	} catch (err) {
        console.log(err);
	}
}

function uploadtoS3(data,filename){
	const BUCKET_NAME = process.env.BUCKET_NAME;
	const IAM_USER_KEY = process.env.IAM_USER_KEY;
	const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

	let s3bucket = new AWS.S3({
		accessKeyId : IAM_USER_KEY,
		secretAccessKey : IAM_USER_SECRET,
	})
		var params = {
			Bucket : BUCKET_NAME,
			Key : filename,
			Body : data,
			ACL : 'public-read'
		}
	return new Promise((resolve,reject)=>{
		s3bucket.upload(params,(err,s3response)=>{
			if(err){
				console.log(err);
				reject(err);
			}else{
				console.log('success',s3response);
				resolve(s3response.Location);
			}
		})
	})
}

exports.downloadReport = async (req,res,next)=>{
	try{
	const expenses = await expense.findAll({where: { userId: req.user.id }});
	const formattedExpenses = expenses.map(expense => expense.dataValues);
	const csvString = Papa.unparse(formattedExpenses, {
		header: true,
	  });
	console.log(csvString);
	const filename = 'expense.csv';
	const fileURL = await uploadtoS3(csvString,filename);
	res.status(200).json({fileURL,success:true})
	}catch (err){
		res.status(500).json({fileURL:'',success:false});
	}
}




