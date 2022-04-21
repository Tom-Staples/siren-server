const express = require('express');
const router = express.Router();
const { validateToken } = require('../../JWT');

router.get('/', validateToken, (req, res) => {
  res.json({ auth: true });
});

module.exports = router;
