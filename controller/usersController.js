const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(204).json({ message: "No users found" });
  }
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "User id required" });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res.status(204).json({ message: `User ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getSingleUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res.status(204).json({ message: "User ID not found" });
  }
  res.json(user);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  deleteUser,
};
