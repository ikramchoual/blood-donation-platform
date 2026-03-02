const express = require('express');
const router = express.Router();

const { deleteDonor, addDonor, updateDonor } = require('../controllers/donorControllers');

router.post("/add", addDonor);
router.put("/:id", updateDonor);
router.delete('/:id', deleteDonor);

module.exports = router;
