const path = require('path');
const user = require('../models/userModel');
const expense = require('../models/expenseModel');

exports.gethomePage = (req,res,next) =>{
	res.sendFile(path.join(__dirname, '../', 'public', "views", 'homePage.html'));
}

exports.getExpense = async(req,res,next)=>{
	try {
		const expenses = await expense.findAll({ where: { userId: req.user.id } });
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
		await user.update(
			{
			  totalExpenses: req.user.totalExpenses + Number(amount),
			},
			{ where: { id: req.user.id } },
		  );
		await expense.create({
			amount : amount,
			description : description,
			category : category,
			userId : req.user.id,
		})
		res.redirect('/expense/userDashboard');
	}catch(err){
		console.log(err)
	}
}

exports.deleteExpense = async (req,res,next) => {
	try{
    const id = req.params.id;
    const expense = await expense.findByPk(id);
    await user.update(
      {
        totalExpenses: req.user.totalExpenses - expense.amount,
      },
      { where: { id: req.user.id } }
    );
   await expense.destroy({where: {id : id, userId: req.user.id}})
      res.sendStatus(200);
	}catch(err){
		console.log(err);
	}
  }