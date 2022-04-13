const bcrypt = require('bcrypt');
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const usersRaw = await fsPromises.readFile(path.join(__dirname, '..', 'model', 'users.txt'), 'utf8');
    const users = JSON.parse(usersRaw);
    const user = users.find(user => user.name = req.body.name);
    if(user === undefined){
        return res.status(400).json({"message":"Cannot Find User"});
    }
    try {
       if (await bcrypt.compare(req.body.password, user.password)){
           res.json({"message":"succeess"});
       } else {
           res.status(401).json({"message":"Wrong Password"});
       }
    } catch {
        res.status(500).json({"message":"Server Error"});
    }
}

module.exports = { handleLogin };