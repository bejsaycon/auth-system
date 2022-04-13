const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const fsPromises = require('fs').promises;
const path = require('path');


router.post("/", async (req, res) => {
  try {
    const usersRaw = await fsPromises.readFile(
      path.join(__dirname, "..", "model", "users.txt"),
      "utf8"
    );
    const users = JSON.parse(usersRaw);
    const usernamefind = users.find((user) => user.name == req.body.name);
    if (usernamefind === undefined) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = { name: req.body.name, password: hashedPassword };
      users.push(user);
      const updatedUsers = JSON.stringify(users);
      await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.txt"),
        updatedUsers
      );
      res.status(201).json({ message: "User Created" });
    } else {
      res.status(400).json({ message: "Username Taken" });
    }
  } catch (err) {
    res.json({"message": err.message});
  }
});

module.exports = router;
