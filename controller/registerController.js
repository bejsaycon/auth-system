
const User = require('../model/User');
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const {usrnm, pwd} = req.body;
  if ( !usrnm || !pwd ) return res.status(400).json({'message':'Username and Password are required!'});
  //check for duplicate usernames in the database
  const duplicate = await User.findOne({ username: usrnm }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict 
  try {
      const hashedPassword = await bcrypt.hash(pwd, 10);
      const result = await User.create({
        'username': usrnm,
        'password': hashedPassword
      });
      console.log(result); //remove later only for testing purposes
      res.status(201).json({ 'success': `User ${usrnm} Created!` });
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

module.exports = { handleNewUser } ;