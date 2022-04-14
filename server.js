// Simple Authentication System Sign-in/Sign-up with express js 
//TODO : Connect Database to MongoDB
require('dotenv').config();
const express = require("express"); 
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

// Cross Origin Resource Sharing
app.use(cors());

// built in middleware for json 
app.use(express.json());

//api for users data
app.use('/users', require('./routes/api/users'));

// post request handler for register user
app.use('/register', require('./routes/register'));

// post request handler for login
app.use('/login', require('./routes/login'));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// mongodb+srv://bejsaycon:<password>@cluster0.oezuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority