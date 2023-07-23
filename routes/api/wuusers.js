const express = require('express');
const router  = express.Router();
const wuusersController = require('../../controllers/wuusersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), wuusersController.getAllWuusers);

module.exports = router;