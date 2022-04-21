const express = require('express');
const router = express.Router();
const userSchema = require('../../Schemas/userSchema');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  try {
    userSchema.create({
      username: username,
      password: hashPass
    });
    res.json({ auth: true, message: 'User Successfully Registered' });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
