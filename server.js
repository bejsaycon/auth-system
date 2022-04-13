// Simple Authentication System Sign-in/Sign-up with express js 
//TODO : Connect Database to MongoDB

const express = require("express"); 
const app = express();
const cors = require('cors');

// Cross Origin Resource Sharing
app.use(cors());

// built in middleware for json 
app.use(express.json());

//api for users data TODO: and Create Controller
app.use('/users', require('./routes/api/users'));

// post request handler for register user TODO: Create Controller
app.use('/register', require('./routes/register'));

// post request handler for login TODO: Create Router and Create Controller
app.use('/login', require('./routes/login'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});