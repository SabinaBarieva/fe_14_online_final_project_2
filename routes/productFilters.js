const express = require('express');
const router = express.Router();
const { productFilters } = require('../controllers/productFilters');

router.get('/', productFilters);
module.exports = router;
