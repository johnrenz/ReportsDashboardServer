const express = require('express');
const router  = express.Router();
const path = require('path');
const webUsersController = require('../../controllers/webUsersController');

router.route('/')    
    .post(webUsersController.searchTopWebUsers);

module.exports = router;