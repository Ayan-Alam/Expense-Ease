const path = require('path');
const expense = require('../models/expenseModel');

exports.gethomePage = (req,res,next) =>{
	res.sendFile(path.join(__dirname, '../', 'public', "views", 'homePage.html'));
}

exports.getExpense = async(req,res,next)=>{
	try {
		const expenses = await expense.findAll();
		res.json(expenses);
	  } catch (err) {
		console.log(err);
	  }
}

exports.addExpense = async (req,res,next)=>{
	try{
		const amount = req.body.amount;
		const description = req.body.description;
		const category = req.body.category;
		await expense.create({
			amount : amount,
			description : description,
			category : category,
		})
		res.redirect('/expense/userDashboard');
	}catch(err){
		console.log(err)
	}
}

exports.deleteExpense = async (req,res,next) => {
	try{
    const id = req.params.id;
   await expense.destroy({where: {id : id}})
      res.sendStatus(200);
	}catch(err){
		console.log(err);
	}
  }