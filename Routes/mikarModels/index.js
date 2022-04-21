const express = require('express');
const router = express.Router();
const MikarSchema = require('../../Schemas/mikarSchema');

router.get('/', async (req, res) => {
  try {
    const modelName = req.query.model;
    const models = await MikarSchema.find({
      name: modelName
    });
    res.json(models);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
