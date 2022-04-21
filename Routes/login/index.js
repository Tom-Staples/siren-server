const express = require('express');
const router = express.Router();
const userSchema = require('../../Schemas/userSchema');
const bcrypt = require('bcrypt');
const { createToken } = require('../../JWT');

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userSchema.find({
      username: username
    });
    if (user.length === 0) {
      res.status(400).json({ auth: false, error: 'User does not exist' });
    } else {
      const dbPass = user[0].password;
      const match = await bcrypt.compare(password, dbPass);
      if (match) {
        const token = createToken(user);
        res.json({ auth: true, token: token, user: user[0] });
      } else {
        res
          .status(400)
          .json({ auth: false, error: 'Username and password do not match' });
      }
    }
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
