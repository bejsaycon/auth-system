//Auth System Server for auth-react app 
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const fsPromises = require('fs').promises;
const path = require('path');

app.use(express.json());
app.use(cors());

app.get('/api/users', async(req, res) => {
    let users = await fsPromises.readFile(path.join(__dirname, 'files', 'users.txt'), 'utf8');
    const userJson = JSON.parse(users);
    res.json(userJson);
});

// post request handler for sign in 
app.post('/users', async (req, res)=>{
    try {
        const usersRaw = await fsPromises.readFile(path.join(__dirname, 'files', 'users.txt'), 'utf8');
        const users = JSON.parse(usersRaw);
        const usernamefind = users.find(user => user.name == req.body.name);
        if (usernamefind === undefined){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = {name: req.body.name, password: hashedPassword};
            users.push(user);
            const updatedUsers = JSON.stringify(users);
            await fsPromises.writeFile(path.join(__dirname, 'files', 'users.txt'),updatedUsers);
            res.status(201).json({message:"User Created"})
        } else {
            res.status(400).json({message:"Username Taken"});
        }
    } catch {
        res.sendStatus(500);
    }
});

// post request handler for log in 
app.post('/login', async (req, res) => {
    const usersRaw = await fsPromises.readFile(path.join(__dirname, 'files', 'users.txt'), 'utf8');
    const users = JSON.parse(usersRaw);
    console.log(users);
    const user = users.find(user => user.name = req.body.name);
    console.log(user)
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
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});