const express = require('express');
const router = express.Router();
const MikarFabricSchema = require('../../Schemas/mikarFabricSchema');

router.get('/', async (req, res) => {
  try {
    const fabricType = req.query.fabricType;
    const fabrics = await MikarFabricSchema.find({
      fabricType: fabricType
    });
    res.json(fabrics);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
