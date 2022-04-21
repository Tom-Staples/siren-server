const express = require('express');
const router = express.Router();
const PphuFabricSchema = require('../../Schemas/pphuFabricSchema');

router.get('/', async (req, res) => {
  try {
    const fabricType = req.query.fabricType;
    const fabrics = await PphuFabricSchema.find({
      fabricType: fabricType
    });
    res.json(fabrics);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
