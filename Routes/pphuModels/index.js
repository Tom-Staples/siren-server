const express = require('express');
const router = express.Router();
const PphuSchema = require('../../Schemas/pphuSchema');

router.get('/', async (req, res) => {
  try {
    const modelName = req.query.model;
    const models = await PphuSchema.find({
      name: modelName
    });
    res.json(models);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
