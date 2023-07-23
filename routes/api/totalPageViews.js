const express = require('express');
const router  = express.Router();
const path = require('path');
const totalPageViewsController = require('../../controllers/totalPageViewsController');

router.route('/')    
    .post(totalPageViewsController.searchTotalPageViews);

module.exports = router;