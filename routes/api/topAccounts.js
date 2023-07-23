const express = require('express');
const router  = express.Router();
const path = require('path');
const topAccountsController = require('../../controllers/topAccountsController');

router.route('/')    
    .post(topAccountsController.searchTopAccounts);

module.exports = router;