const express = require('express');
const router = express.Router();
const ImsFabricSchema = require('../../Schemas/imsFabricSchema');

router.get('/', async (req, res) => {
  try {
    const fabricType = req.query.fabricType;
    const fabrics = await ImsFabricSchema.find({
      fabricType: fabricType
    });
    res.json(fabrics);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
