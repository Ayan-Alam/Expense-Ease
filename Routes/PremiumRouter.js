const express = require('express');
const router =  express.Router();
const premiumController = require("../Controller/PremiumController")
const userAuthentication = require("../middleware/Auth");


router.get('/premiumUser',userAuthentication,premiumController.purchasePremium);

router.post('/updateTransactionStatus',userAuthentication,premiumController.updateTransactionStatus);

module.exports = router;