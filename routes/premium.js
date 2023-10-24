const express = require('express');
const router =  express.Router();
const premiumController = require("../controller/premium")
const userAuthentication = require("../middleware/Auth");

router.use(express.static("public"));

router.get('/premium', userAuthentication, premiumController.purchasePremium);

router.post('/transactions', userAuthentication, premiumController.updateTransactionStatus);

router.get('/leaderboard', premiumController.getLeaderboardPage);

router.get('/reports', premiumController.getReportPage);

router.post('/reports/daily', userAuthentication, premiumController.dailyReports);

router.post('/reports/monthly', userAuthentication, premiumController.monthlyReports);

module.exports = router;