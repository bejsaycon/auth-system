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

        //create JWT
        console.log(foundUser.username);
        const accessToken = jwt.sign(
            {'username': foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '70s'}
        );
        const refreshToken = jwt.sign(
            {'username': foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        res.json({"success":"User Logged in!"});
    }
    else {
        res.status(401).json({"message":"Wrong Password"});
    }
}

module.exports = { handleLogin };