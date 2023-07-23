const express = require('express');
const router  = express.Router();
const path = require('path');
const accountNamesController = require('../../controllers/accountNamesController');

router.route('/')    
    .get(accountNamesController.getAllAccountNames);

module.exports = router;