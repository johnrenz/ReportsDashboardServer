const express = require('express');
const router  = express.Router();
const path = require('path');
const componentsController = require('../../controllers/componentsController');

router.route('/')    
    .post(componentsController.searchComponents);

module.exports = router;