const express = require('express');
const router = express.Router();
const ImobSchema = require('../../Schemas/imobSchema');

router.get('/', async (req, res) => {
  try {
    const modelName = req.query.model;
    const models = await ImobSchema.find({
      name: modelName
    });
    res.json(models);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
