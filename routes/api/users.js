const User = require('../../model/User');
const express = require('express');
const router = express.Router();
const usersController = require('../../controller/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .delete(usersController.deleteUser);

router.route('/:user')
    .get(usersController.getSingleUser);

module.exports = router;
