const express = require('express');
const router = express.Router();

const fsPromises = require('fs').promises;
const path = require('path');

//TODO: Create router.route method inorder to control delete requests, then create a separate module for the controller

router.get('/', async(req, res) => {
    let users = await fsPromises.readFile(path.join(__dirname, '..', '..', 'model', 'users.txt'), 'utf8');
    const userJson = JSON.parse(users);
    res.json(userJson);
});

module.exports = router;
