// Simple Authentication System Sign-in/Sign-up with express js

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 8080;

//Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors());

// built in middleware for json
app.use(express.json());

//api for users data
app.use("/users", require("./routes/api/users"));

// post request handler for register user
app.use("/register", require("./routes/register"));

// post request handler for login
app.use("/login", require("./routes/login"));

app.use('/contacts', require('./routes/api/contacts'));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
});

//TODO: Create Logger Middleware, Create Verify Role Middleware, Make use of JWT