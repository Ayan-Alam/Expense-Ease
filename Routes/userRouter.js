const express = require('express');
const router =  express.Router();
const userController = require("../Controller/userController");

router.use(express.static("public"));

router.get('/',userController.getIndex);

router.post('/user',userController.addUser);

router.post('/getuser',userController.getUser);

module.exports = router;