const express = require('express');
const router  = express.Router();
const path = require('path');
const usageByWebSiteController = require('../../controllers/usageByWebSiteController');

router.route('/')    
    .post(usageByWebSiteController.searchUsageByWebsite);

module.exports = router;