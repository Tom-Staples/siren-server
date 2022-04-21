const express = require('express');
const router = express.Router();
const FeniksSchema = require('../../Schemas/feniksSchema');

router.get('/', async (req, res) => {
  try {
    const modelName = req.query.model;
    const models = await FeniksSchema.find({
      name: modelName
    });
    res.json(models);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
