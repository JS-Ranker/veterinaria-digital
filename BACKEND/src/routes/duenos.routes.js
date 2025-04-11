const express = require('express');
const router = express.Router();
const { getDuenos, createDueno } = require('../controllers/duenos.controller');

router.get('/', getDuenos);
router.post('/', createDueno);

module.exports = router;
