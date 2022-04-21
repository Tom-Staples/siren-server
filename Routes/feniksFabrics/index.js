const express = require('express');
const router = express.Router();
const feniksFabricsSchema = require('../../Schemas/feniksFabricSchema');

router.get('/', async (req, res) => {
  try {
    const fabricType = req.query.fabricType;
    const fabrics = await feniksFabricsSchema.find({
      fabricType: fabricType
    });
    res.json(fabrics);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
