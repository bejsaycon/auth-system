// TO FIX: usersController.getSingleUser 

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 8080;

//Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built in middleware for json
app.use(express.json());

//api for users data
app.use("/users", require("./routes/api/users"));

// post request handler for register user
app.use("/register", require("./routes/register"));

// post request handler for login
app.use("/login", require("./routes/login"));

//router for create update delete get post for contacts api
app.use('/contacts', require('./routes/api/contacts'));

//custom middleware for errors
app.use(errorHandler); 

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
});

//TODO: Create Verify Role Middleware, Make use of JWT