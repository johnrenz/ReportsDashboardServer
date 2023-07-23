const express = require('express');
const router  = express.Router();
const wuusersController = require('../../controllers/wuusersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), wuusersController.getWUUser)
    .post(verifyRoles(ROLES_LIST.Admin), wuusersController.createWUUser)
    .put(verifyRoles(ROLES_LIST.Admin), wuusersController.updateWUUser);

module.exports = router;