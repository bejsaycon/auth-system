// Simple Authentication System Sign-in/Sign-up with express js 

const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const fsPromises = require('fs').promises;
const path = require('path');

// Cross Origin Resource Sharing
app.use(cors());

// built in middleware for json 
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// post request handler for register user TODO: Create Controller
app.use('/register', require('./routes/register'));

//api for users data TODO: Create Router and Create Controller
app.get('/api/users', async(req, res) => {
    let users = await fsPromises.readFile(path.join(__dirname, 'model', 'users.txt'), 'utf8');
    const userJson = JSON.parse(users);
    res.json(userJson);
});

// post request handler for log in TODO: Create Router and Create Controller
app.post('/login', async (req, res) => {
    const usersRaw = await fsPromises.readFile(path.join(__dirname, 'model', 'users.txt'), 'utf8');
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