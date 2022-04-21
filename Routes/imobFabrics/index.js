const express = require('express');
const router = express.Router();
const ImobFabricSchema = require('../../Schemas/imobFabricSchema');

router.get('/', async (req, res) => {
  try {
    const fabricType = req.query.fabricType;
    const fabrics = await ImobFabricSchema.find({
      fabricType: fabricType
    });
    res.json(fabrics);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
