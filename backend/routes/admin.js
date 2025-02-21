const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');

router.get('/dashboard', auth, isAdmin, (req, res) => {
  res.json({ msg: 'Welcome to the admin dashboard' });
});

module.exports = router;