const express = require('express');
const router  = express.Router();
const path = require('path');
const allActivityController = require('../../controllers/allActivityController');

router.route('/')    
    .post(allActivityController.searchAllActivity);

module.exports = router;