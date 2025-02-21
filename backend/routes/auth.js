const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all users (for admin)
// Get all users (for admin)
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({}, 'name'); // Fetch only names of users
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;