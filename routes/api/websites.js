const express = require('express');
const router  = express.Router();
const path = require('path');
const websitesController = require('../../controllers/websitesController');

router.route('/')    
    .get(websitesController.getAllWebsites);

module.exports = router;