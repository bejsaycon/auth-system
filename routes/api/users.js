const express = require('express');
const router = express.Router();
const usersController = require('../../controller/usersController')
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/:user')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getSingleUser);

module.exports = router;
