const express = require('express');
const router =  express.Router();
const expenseController = require("../Controller/expenseController");

router.use(express.static("public"));

router.get('/',expenseController.getIndex);

router.post('/user',expenseController.addUser);

module.exports = router;