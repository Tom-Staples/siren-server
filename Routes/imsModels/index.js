const express = require('express');
const router = express.Router();
const ImsSchema = require('../../Schemas/imsSchema');

router.get('/', async (req, res) => {
  try {
    const modelName = req.query.model;
    const models = await ImsSchema.find({
      name: modelName
    });
    res.json(models);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
