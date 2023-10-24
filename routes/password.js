const express = require('express');
const router =  express.Router();
const passwordController = require('../controller/password');

router.get('/password/reset', passwordController.getResetPasswordPage);

router.post('/password/reset', passwordController.resetPassword);

router.get('/password/reset/:requestId', passwordController.displayResetPasswordPage);

router.post('/password/email', passwordController.sendPasswordEmail);

module.exports = router;