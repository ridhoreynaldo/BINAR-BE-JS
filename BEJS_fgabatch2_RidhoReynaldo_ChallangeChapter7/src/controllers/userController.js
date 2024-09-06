const { User } = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send('User created successfully.');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('An error occurred.');
  }
};