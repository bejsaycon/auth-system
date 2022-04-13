const express = require('express');
const router = express.Router();

const fsPromises = require('fs').promises;
const path = require('path');

router.get('/', async(req, res) => {
    let users = await fsPromises.readFile(path.join(__dirname, '..', '..', 'model', 'users.txt'), 'utf8');
    const userJson = JSON.parse(users);
    res.json(userJson);
});

module.exports = router;
