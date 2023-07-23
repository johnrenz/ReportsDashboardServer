const express = require('express');
const router  = express.Router();
const path = require('path');
const hitsOverTimeController = require('../../controllers/hitsOverTimeController');

router.route('/')    
    .post(hitsOverTimeController.searchHitsOverTime);

module.exports = router;