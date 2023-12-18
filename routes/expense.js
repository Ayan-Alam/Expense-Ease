const express = require('express');
const router =  express.Router();
const expenseController = require("../controller/expense");
const userAuthentication = require("../middleware/Auth");

router.use(express.static('public'));

router.get('/dashboard', expenseController.getDashboard);

router.post('/expenses', userAuthentication, expenseController.addExpense);

router.get('/expenses/:page', userAuthentication, expenseController.getExpensesPage);

router.delete('/expenses/:id', userAuthentication, expenseController.deleteExpense);

module.exports = router;
