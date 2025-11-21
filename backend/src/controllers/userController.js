const { User } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// exports.getUsers = async (req, res) => {
//   try {
//     const User = await User.findAll();
//     res.json(User);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
