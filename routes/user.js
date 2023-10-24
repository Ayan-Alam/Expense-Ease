const express = require('express');
const router =  express.Router();
const userController = require("../controller/user");
const userAuthentication = require("../middleware/Auth");

router.use(express.static("public"));

router.get('/', userController.getIndex);

router.post('/users', userController.createUser);

router.post('/user', userController.getUser);

router.get('/users', userController.alluser);

router.get('/users/isPremium', userAuthentication, userController.isPremium);

router.get('/download-report', userAuthentication, userController.downloadReport);

module.exports = router;