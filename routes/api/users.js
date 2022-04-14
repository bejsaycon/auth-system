const User = require('../../model/User');
const express = require('express');
const router = express.Router();

//TODO: Create router.route method inorder to control delete requests, then create a separate module for the controller
router.get('/', async(req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
});

module.exports = router;
