require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const {usrnm, pwd} = req.body;
    if ( !usrnm || !pwd ) return res.status(400).json({'message':'Username and Password are required!'});
    const foundUser = await User.findOne({ username: usrnm }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    //check password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '70s'}
        );
        const refreshToken = jwt.sign(
            {'username': foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true, 
        res.json({ accessToken });
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };