const userModel = require('../models/userModel');

// create new user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const newUser = userModel.createUser(name, email);
  res.status(201).json(newUser);
};

// show all users
exports.getUsers = (req, res) => {
  const users = userModel.getUsers();
  res.status(200).json(users);
};

// show a user by ID
exports.getOneUser = (req, res) => {
  const user = userModel.getOneUser(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

// delete a user by ID
exports.deleteUser = (req, res) => {
  const success = userModel.deleteUser(req.params.id);
  if (!success) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'User deleted successfully' });
};
