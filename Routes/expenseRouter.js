const express = require('express');
const router =  express.Router();
const expenseController = require("../Controller/expenseController");

router.use(express.static("public"));

router.get('/userDashboard',expenseController.gethomePage);

router.post('/addExpense', expenseController.addExpense);

router.get('/getExpense',expenseController.getExpense);

router.delete('/deleteExpense/:id',expenseController.deleteExpense);

module.exports = router;