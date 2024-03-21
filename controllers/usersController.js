const User = require('../models/User');

const getAllUsers = async (_, res) => {
  const users = await User.find({});
  res.json(users);
};

// users/:username
const getUserById = async (req, res) => {
  const { id } = req.params;
  res.json({ message: `Here is user number ${id}` });
};

const createNewUser = async (req, res) => {
  // const { username, email, password, roles } = req.body;
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// users/:username
const updateUser = async (req, res) => {
  const { id, email, password, roles } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        email,
        password,
        roles,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// users/:username
const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
