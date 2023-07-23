const express = require('express');
const router  = express.Router();
const path = require('path');
const usersController = require('../../controllers/usersController');

router.route('/')    
    .get(usersController.getAllUsers);

module.exports = router;