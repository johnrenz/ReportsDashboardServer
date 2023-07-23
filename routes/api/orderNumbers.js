const express = require('express');
const router  = express.Router();
const path = require('path');
const orderNumbersController = require('../../controllers/orderNumbersController');

router.route('/')    
    .get(orderNumbersController.getAllOrderNumbers);

module.exports = router;